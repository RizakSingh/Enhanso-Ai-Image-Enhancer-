const imageRoutes = require("./routes/ImageRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const ImagePair = require("./models/ImagePair");

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));

const API_KEY = "wxhqvgo5lpkc882xb";
const BASE_URL = "https://techhk.aoscdn.com/api/tasks/visual";

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/imageEnhancerDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: Get endpoint by feature
const getEndpoint = (feature) => {
  switch (feature) {
    case "enhance":
      return `${BASE_URL}/scale`;
    case "removebg":
      return `${BASE_URL}/segmentation`;
    case "colorize":
      return `${BASE_URL}/colorization`;
    default:
      throw new Error("Invalid feature type");
  }
};

// POST route to process image
app.post("/api/process", upload.single("image"), async (req, res) => {
  try {
    const { feature } = req.body;
    if (!feature) return res.status(400).json({ error: "Feature type is required" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const endpoint = getEndpoint(feature);
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    // Step 1: Create processing task
    const { data: taskData } = await axios.post(endpoint, formData, {
      headers: {
        "X-API-KEY": API_KEY,
        ...formData.getHeaders(),
      },
    });

    const taskId = taskData?.data?.task_id;
    if (!taskId) throw new Error("No task_id returned from API");

    console.log(`🆔 Task created (${feature}) →`, taskId);

    // Step 2: Poll result until complete
    let resultUrl = null;
    for (let i = 0; i < 15; i++) {
      const { data: pollData } = await axios.get(`${endpoint}/${taskId}`, {
        headers: { "X-API-KEY": API_KEY },
      });

      if (pollData?.data?.image) {
        resultUrl = pollData.data.image;
        break;
      }

      await new Promise((r) => setTimeout(r, 2000)); // wait 2 sec
    }

    if (!resultUrl) throw new Error("Processing timed out");

    // Step 3: Save pair to MongoDB
    const imagePair = await ImagePair.create({
      beforeUrl: `data:image/png;base64,${req.file.buffer.toString("base64")}`,
      afterUrl: resultUrl,
      featureUsed: feature,
    });

    console.log("✅ Saved to MongoDB:", imagePair._id);
    res.json({ success: true, data: imagePair });
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET route to fetch all image pairs
app.get("/api/images", async (req, res) => {
  try {
    const images = await ImagePair.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// -------------------------
// Save image pair (manual)
// POST /api/save-image
// -------------------------
app.post("/api/save-image", async (req, res) => {
  try {
    const { beforeUrl, afterUrl, feature } = req.body;

    if (!beforeUrl || !afterUrl) {
      console.error("❌ Missing data:", { beforeUrl: !!beforeUrl, afterUrl: !!afterUrl });
      return res.status(400).json({ error: "Missing beforeUrl or afterUrl" });
    }

    const newPair = await ImagePair.create({
      beforeUrl,
      afterUrl,
      featureUsed: feature || "unknown",
    });

    console.log("✅ ImagePair saved:", newPair._id);
    return res.status(201).json({ success: true, data: newPair });
  } catch (err) {
    console.error("❌ Error saving image pair:", err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
});
app.use("/api/images", imageRoutes);
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

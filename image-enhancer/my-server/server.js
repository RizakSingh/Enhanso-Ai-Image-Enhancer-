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
app.use(express.json({ limit: "50mb" }));

const API_KEY = "wxhqvgo5lpkc882xb";
const BASE_URL = "https://techhk.aoscdn.com/api/tasks/visual";

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/imageEnhancerDB")
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

// =====================================================
//             FINAL UPDATED /api/process ROUTE
// =====================================================
app.post("/api/process", upload.single("image"), async (req, res) => {
  try {
    const { feature } = req.body;
    if (!feature)
      return res.status(400).json({ error: "Feature type is required" });
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    const endpoint = getEndpoint(feature);
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    // STEP 1 — Create processing task
    const { data: taskData } = await axios.post(endpoint, formData, {
      headers: {
        "X-API-KEY": API_KEY,
        ...formData.getHeaders(),
      },
    });

    const taskId = taskData?.data?.task_id;
    if (!taskId) throw new Error("No task_id returned from API");

    console.log(`🆔 Task created (${feature}) →`, taskId);

    // STEP 2 — Poll result until ready
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

    // =====================================================
    // STEP 3 — Validate BEFORE downloading
    // =====================================================
    if (!resultUrl || typeof resultUrl !== "string") {
      console.error("❌ Invalid resultUrl:", resultUrl);
      return res.status(500).json({ error: "Invalid processed image URL" });
    }

    // =====================================================
    // STEP 4 — Download processed image safely
    // =====================================================
    let afterImgBuffer;
    try {
      afterImgBuffer = await axios.get(resultUrl, {
        responseType: "arraybuffer",
      });
    } catch (e) {
      console.error("❌ Failed to download processed image:", e.message);
      return res.status(500).json({
        error: "Failed to download processed image from external API",
      });
    }

    // =====================================================
    // STEP 5 — Convert to Base64 (PERMANENT)
    // =====================================================
    const afterBase64 = `data:image/png;base64,${Buffer.from(
      afterImgBuffer.data
    ).toString("base64")}`;

    const beforeBase64 = `data:image/png;base64,${req.file.buffer.toString(
      "base64"
    )}`;

    // =====================================================
    // STEP 6 — Save to DB (Before + After)
    // =====================================================
    const imagePair = await ImagePair.create({
      beforeUrl: beforeBase64,
      afterUrl: afterBase64,
      featureUsed: feature,
    });

    console.log("✅ Saved to MongoDB:", imagePair._id);

    // SEND TO FRONTEND
    res.json({ success: true, data: imagePair });
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// Fetch all images for Gallery
// =====================================================
app.get("/api/images", async (req, res) => {
  try {
    const images = await ImagePair.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// =====================================================
// Manual Save (Optional — frontend won't use now)
// =====================================================
app.post("/api/save-image", async (req, res) => {
  try {
    const { beforeUrl, afterUrl, feature } = req.body;

    if (!beforeUrl || !afterUrl) {
      console.error("❌ Missing data:", {
        beforeUrl: !!beforeUrl,
        afterUrl: !!afterUrl,
      });
      return res
        .status(400)
        .json({ error: "Missing beforeUrl or afterUrl" });
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
    return res.status(500).json({ error: err.message });
  }
});

app.use("/api/images", imageRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

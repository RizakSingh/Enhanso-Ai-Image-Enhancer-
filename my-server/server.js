const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const auth = require("./middleware/auth");
require('dontenv').config()
const ImagePair = require("./models/ImagePair");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ================= BODY PARSERS ================= */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));


const API_KEY = process.env.PICWISH_API_KEY;
const BASE_URL = process.env.BASE_URL;

const storage = multer.memoryStorage();
const upload = multer({ storage });

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


app.post("/api/process", auth, upload.single("image"), async (req, res) => {
  try {
    const { feature } = req.body;
    if (!feature || !req.file) {
      return res.status(400).json({ error: "Missing data" });
    }

    const endpoint = getEndpoint(feature);
    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    const { data: taskData } = await axios.post(endpoint, formData, {
      headers: {
        "X-API-KEY": API_KEY,
        ...formData.getHeaders(),
      },
    });

    const taskId = taskData?.data?.task_id;
    if (!taskId) throw new Error("Task ID missing");

    let resultUrl = null;
    for (let i = 0; i < 10; i++) {
      const { data } = await axios.get(`${endpoint}/${taskId}`, {
        headers: { "X-API-KEY": API_KEY },
      });
      if (data?.data?.image) {
        resultUrl = data.data.image;
        break;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }

    if (!resultUrl) throw new Error("Timeout");

    const afterImg = await axios.get(resultUrl, {
      responseType: "arraybuffer",
    });

    const imagePair = await ImagePair.create({
      userId: req.userId, // 
      beforeUrl: `data:image/png;base64,${req.file.buffer.toString("base64")}`,
      afterUrl: `data:image/png;base64,${Buffer.from(
        afterImg.data
      ).toString("base64")}`,
      featureUsed: feature,
    });

    res.json({ success: true, data: imagePair });
  } catch (err) {
    console.error("❌ PROCESS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/api/images", auth, async (req, res) => {
  try {
    const images = await ImagePair.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});


app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

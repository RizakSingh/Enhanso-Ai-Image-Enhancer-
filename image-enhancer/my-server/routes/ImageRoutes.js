const express = require("express");
const router = express.Router();
const ImagePair = require("../models/ImagePair");

router.post("/save-image", async (req, res) => {
  try {
    const { beforeUrl, afterUrl, feature } = req.body;
    console.log("📥 Incoming data:", { beforeUrl: !!beforeUrl, afterUrl: !!afterUrl, feature });

    if (!beforeUrl || !afterUrl || !feature) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPair = new ImagePair({
      beforeUrl,
      afterUrl,
      featureUsed: feature,
    });

    await newPair.save();
    console.log("✅ Saved successfully:", newPair._id);

    res.status(201).json({ message: "Image saved successfully", pair: newPair });
  } catch (err) {
    console.error("🔥 Error saving image:", err);
    res.status(500).json({ message: "Failed to save image", error: err.message });
  }
});

router.get("/get-images", async (req, res) => {
  try {
    const images = await ImagePair.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error("🔥 Error fetching images:", err);
    res.status(500).json({ message: "Failed to fetch images", error: err.message });
  }
});

module.exports = router;

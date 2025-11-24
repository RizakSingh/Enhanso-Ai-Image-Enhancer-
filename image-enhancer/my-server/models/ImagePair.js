const mongoose = require("mongoose");

const ImagePairSchema = new mongoose.Schema(
  {
    beforeUrl: {
      type: String,
      required: true,
      trim: true,
    },
    afterUrl: {
      type: String,
      required: true,
      trim: true,
    },
    featureUsed: {
      // renamed from featureUsed → consistent with frontend
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // this automatically adds createdAt & updatedAt
);

// Clean JSON output
ImagePairSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("ImagePair", ImagePairSchema, "imagepairs");


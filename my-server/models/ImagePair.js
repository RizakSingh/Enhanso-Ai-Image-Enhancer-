const mongoose = require("mongoose");

const ImagePairSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, 
    },

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
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);


ImagePairSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("ImagePair", ImagePairSchema);

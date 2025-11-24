/**
 * Dynamically resize image before uploading
 * Supports: enhance, unblur, colorize, removebg
 * Automatically adjusts max width/height depending on feature
 */

export const resizeImage = (file, featureType = "enhance") => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      let { width, height } = img;

      // ✅ Smart limits based on feature type
      let maxWidth, maxHeight;
      switch (featureType) {
        case "removebg":
          maxWidth = 2000;
          maxHeight = 2000;
          break;
        case "colorize":
          maxWidth = 3000;
          maxHeight = 3000;
          break;
        case "unblur":
        case "enhance":
        default:
          maxWidth = 4096;
          maxHeight = 4096;
          break;
      }

      // Resize if image exceeds limits
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
      }

      // Draw resized image
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob (JPEG compression for optimization)
      canvas.toBlob(
        (blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        },
        file.type || "image/jpeg",
        0.92 // compression quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

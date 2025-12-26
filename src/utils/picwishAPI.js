import axios from "axios";
require(dotenv).config();
const API_KEY = process.env.PICWISH_API_KEY;

export const processImage = async (file, featureType) => {
  try {
    const endpointMap = {
      enhance: "https://techhk.aoscdn.com/api/tasks/visual/scale",
      unblur: "https://techhk.aoscdn.com/api/tasks/visual/clarify",
      colorize: "https://techhk.aoscdn.com/api/tasks/visual/colorization",
      removebg: "https://techhk.aoscdn.com/api/tasks/visual/segmentation",
    };

    const endpoint = endpointMap[featureType];
    if (!endpoint) throw new Error(`Invalid feature type: ${featureType}`);

    const formData = new FormData();
    formData.append("sync", 0);
    formData.append("image_file", file);

    // Step 1: Create a task
    const { data } = await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    });

    const taskId = data?.data?.task_id;
    if (!taskId) throw new Error("No task_id returned from API");

    console.log(`🆔 Task created for ${featureType}:`, taskId);

    // Step 2: Poll for the result
    let resultUrl = null;
    for (let i = 0; i < 15; i++) {
      const result = await axios.get(`${endpoint}/${taskId}`, {
        headers: { "X-API-KEY": API_KEY },
      });

      if (result.data?.data?.image) {
        resultUrl = result.data.data.image;
        break;
      }

      console.log(`⏳ Waiting for ${featureType} result...`);
      await new Promise((r) => setTimeout(r, 2000)); // wait 2 seconds
    }

    if (!resultUrl) throw new Error(`${featureType} processing timed out`);

    console.log(`✅ ${featureType} processed successfully`);
    return resultUrl;
  } catch (error) {
    console.error(`❌ Error in ${featureType}:`, error.response?.data || error.message);
    throw error;
  }
};

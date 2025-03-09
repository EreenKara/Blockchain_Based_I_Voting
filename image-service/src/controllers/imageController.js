const { uploadImageUrl } = require("../services/imageService"); // imageService'i dahil et

const uploadImageController = async (req, res) => {
  try {
    // Resim URL'sini eklemek için imageService'den gelen fonksiyonu çağır
    await uploadImageUrl(req, res);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in image upload controller",
        error: error.message,
      });
  }
};

module.exports = {
  uploadImageController,
};

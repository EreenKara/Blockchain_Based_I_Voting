const Image = require("../models/Image"); // Image modelini dahil et

// URL üzerinden resim kaydetme
const uploadImageUrl = async (req, res) => {
  try {
    // URL'yi request body'den al
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    // Resim URL'sini veritabanına kaydet
    const image = await Image.create({ path: imageUrl });

    res.status(200).json({
      message: "Image URL added successfully",
      image: {
        id: image.id,
        path: image.path,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding image URL", error: error.message });
  }
};

module.exports = {
  uploadImageUrl,
};

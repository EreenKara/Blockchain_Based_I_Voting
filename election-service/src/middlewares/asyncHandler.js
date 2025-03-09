const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    console.error("❌ Asenkron hata yakalandı:", error);

    // 📌 Varsayılan hata kodu 500 (Internal Server Error)
    const statusCode = error.statusCode || 500;

    // 📌 Hata mesajını kontrol et, yoksa varsayılan bir hata mesajı göster
    const message = error.message || "Beklenmeyen bir hata oluştu.";

    res.status(statusCode).json({ success: false, message });
  });
};

module.exports = asyncHandler;

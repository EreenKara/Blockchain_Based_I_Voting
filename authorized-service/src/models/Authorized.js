const mongoose = require("mongoose");

const authorizedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    identityNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 11,
      maxlength: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // Telefon numarasını 10 haneli kontrol eder
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Authorized", authorizedSchema);

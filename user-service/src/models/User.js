const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
      // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    },
    hasPaidBalance: {
      type: Boolean,
      default:false    // Varsayılan olarak bakiye ödenmemiş
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

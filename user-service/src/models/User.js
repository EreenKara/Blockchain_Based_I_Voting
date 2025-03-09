const { Sequelize, DataTypes } = require('sequelize');
const yup = require('yup');  // Yup kütüphanesini dahil ediyoruz
const sequelize = require("../config/database");



// Yup şeması tanımlıyoruz
const userValidationSchema = yup.object().shape({
  name: yup.string()
    .required('İsim gereklidir')
    .matches(/^[a-zA-ZıİçÇğĞöÖşŞüÜ\s]+$/, 'İsim sadece harflerden oluşabilir')
    .trim(),
    
  surname: yup.string()
    .required('Soyisim gereklidir')
    .matches(/^[a-zA-ZıİçÇğĞöÖşŞüÜ\s]+$/, 'Soyisim sadece harflerden oluşabilir')
    .trim(),
    username: yup.string()
    .required('Kullanıcı Adı gereklidir')
    .trim(),
    
    identityNumber: yup.string()
    .length(11, 'TC Kimlik numarası 11 haneli olmalıdır')
    .required('TC Kimlik numarası gereklidir')
    .matches(
      /^[1-9][0-9]{10}$/, 
      'TC Kimlik Numarası 11 haneli ve geçerli olmalıdır'
    )
    // .test('isValidTC', 'Geçersiz TC Kimlik Numarası', (value) => {
    //   const digits = value.split('').map(Number);

    //   // 1. kural: İlk 10 haneye göre 11. haneyi doğrula
    //   const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    //   const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
    //   const checkDigit10 = (oddSum * 7 - evenSum) % 10;

    //   if (checkDigit10 !== digits[9]) return false;

    //   // 2. kural: İlk 10 hanenin toplamına göre 11. haneyi doğrula
    //   const totalSum = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
    //   const checkDigit11 = totalSum % 10;

    //   if (checkDigit11 !== digits[10]) return false;

    //   return true;
    // })
    ,
    
  email: yup.string()
    .email('Geçersiz e-posta formatı')
    .required('E-posta gereklidir')
    .lowercase(),
    
  phoneNumber: yup.string()
    .matches(/^[0-9]{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon numarası gereklidir')
    .matches(/^[0-9]+$/, 'Telefon numarası sadece rakamlardan oluşmalıdır'),
    
  password: yup.string()
  .required("Şifre zorunludur") // Şifrenin boş olmaması gerekir
  .min(8, "Şifre en az 8 karakter uzunluğunda olmalıdır") // Minimum 8 karakter uzunluğu
  .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir") // En az bir büyük harf
  .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir") // En az bir küçük harf
  .matches(/[0-9]/, "Şifre en az bir rakam içermelidir") // En az bir rakam
  .matches(
     /[\!@#\$%\^&\*\(\)\_\+\-=\[\]\{\};:\'",<>\./?\\|`~]/,
     "Şifre en az bir özel karakter içermelidir"
  ),
    
  hasPaidBalance: yup.boolean().default(false),
  
  verificationCode: yup.string()
    .length(6, 'Doğrulama kodu 6 haneli olmalıdır')
    .notRequired(),
});



// User modelini oluşturuyoruz
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  identityNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hasPaidBalance: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});
module.exports = { User, userValidationSchema };

import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '@env';

class Encrytion {
  constructor() {}
  encryptData(data) {
    const algorithm = 'AES';
    switch (algorithm) {
      case 'AES': // simetrik şifreleme
        return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
        break;

      default:
        break;
    }
  }
  decryptData(encryptedData) {
    const algorithm = 'AES';

    switch (algorithm) {
      case 'AES':
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8); // Şifre çözülmüş metni döndürür
        break;

      default:
        break;
    }
  }
  // HMAC, mesaj doğrulama ve bütünlük kontrolü için kullanılır.
  // key herhangi bri şey olabilri fşire gibi düşnü ben belirliyorum
  signData(data, key) {
    return CryptoJS.HmacSHA256(data, key).toString();
  }
  hashData(data) {
    const algorithm = 'SHA256';

    switch (algorithm) {
      case 'SHA256':
        return CryptoJS.SHA256(data).toString();
        break;
      case 'MD5':
        return CryptoJS.MD5(data).toString();
      default:
        break;
    }
  }
}

export {Encrytion};

import CryptoJS from 'crypto-js';
import {SECRET_KEY} from '@env';

export class EncryptionService {
  private static readonly secretKey = SECRET_KEY;

  // Veriyi şifrele
  static encrypt(data: string): string {
    try {
      return CryptoJS.AES.encrypt(data, this.secretKey).toString();
    } catch (error) {
      console.error('Şifreleme hatası:', error);
      throw new Error('Veri şifrelenemedi');
    }
  }

  // Şifrelenmiş veriyi çöz
  static decrypt(encryptedData: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Şifre çözme hatası:', error);
      throw new Error('Şifre çözülemedi');
    }
  }

  // Hash oluştur (örn: şifre hash'leme)
  static hash(data: string): string {
    try {
      return CryptoJS.SHA256(data).toString();
    } catch (error) {
      console.error('Hash oluşturma hatası:', error);
      throw new Error('Hash oluşturulamadı');
    }
  }

  // İki hash'i karşılaştır
  static compareHash(data: string, hash: string): boolean {
    try {
      const newHash = this.hash(data);
      return newHash === hash;
    } catch (error) {
      console.error('Hash karşılaştırma hatası:', error);
      return false;
    }
  }
}

import CryptoJS from "crypto-js";

const secretKey: string  = process.env.JWT_SECRET || "";

// Encrypt a message
export  const encrypt = (message: string): string => {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

// Decrypt a message
export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};



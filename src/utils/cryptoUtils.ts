import CryptoJS from "crypto-js";

const secretKey: string = "my-secret-key";

// Encrypt a message
const encrypt = (message: string): string => {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

// Decrypt a message
const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Example
const encrypted = encrypt("Hello TypeScript");
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);

import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString(); 
}


export const decryptData = (data) => {  
  return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);

}
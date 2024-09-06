import { ethers } from "ethers";
import CryptoJS from "crypto-js";

// Clave secreta proporcionada
const secretKey = "$w89q!00(duym(fl_@x*%e3%tc(d^d64*d)af-rlex8dl*lrog";

// Función para cifrar la privateKey
function encryptPrivateKey(privateKey) {
  return CryptoJS.AES.encrypt(privateKey, secretKey).toString();
}

// Función para descifrar la privateKey
export function decryptPrivateKey(encryptedPrivateKey) {
  const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Función para generar y cifrar la wallet
export async function generarWalletYCifrarPrivateKey() {
  try {
    // Generar una nueva wallet con ethers.js
    const wallet = ethers.Wallet.createRandom();

    // Cifrar la privateKey usando AES
    const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey);

    // Retornar la dirección y la clave privada cifrada
    return {
      address: wallet.address,
      encryptedPrivateKey: encryptedPrivateKey
    };
  } catch (error) {
    console.error("Error al generar la wallet o cifrar la privateKey:", error);
    return null;
  }
}

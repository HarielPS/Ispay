import crypto from "crypto";
import bcrypt from "bcryptjs";

export default class Password {
  static methods = {};
  constructor() {}

  deriveKey = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256"); // 32 bytes para AES-256
  };
}

Password.methods.hashData = async (data) => {
  const sha512hashedPassword = createHash("sha256").update(data).digest("hex");
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(sha512hashedPassword, salt);
};

Password.methods.compareData = async (data, hasheData) => {
  const sha512hashedPassword = createHash("sha512")
    .update(data)
    .digest("base64");
  return await bcrypt.compare(sha512hashedPassword, hasheData);
};

Password.methods.encryptData = (data, password) => {
  const salt = crypto.randomBytes(16);
  const key = Password.deriveKey(password, salt);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  // Devuelve el dato cifrado junto con el salt y el IV
  return {
    salt: salt.toString("hex"),
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};

Password.methods.decryptData = (encryptedData, password, saltHex, ivHex) => {
  const salt = Buffer.from(saltHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const key = deriveKey(password, salt); // Deriva la clave usando la contraseña y el salt

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

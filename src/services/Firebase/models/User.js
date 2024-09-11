import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../Firebase";
import { sendCustomVerificationEmail } from "@/app/company/dashboard/newAccount/helpers/sendEmail";

export default class User {
  static methods = {};

  constructor(UserInformation) {
    this.ID_company_tax = UserInformation.ID_company_tax;
    this.ID_FB = UserInformation.ID_FB || "";
    this.ID_user = UserInformation.ID_user;
    this.name = UserInformation.name;
    this.surname = UserInformation.surname;
    this.ssn = UserInformation.ssn;
    this.work_email = UserInformation.work_email;
    this.role = UserInformation.role;
    this.ADMIN = UserInformation.ADMIN;
    this.image = UserInformation.image || "";
    this.password = UserInformation.password || ""; //Password.methods.hashData(UserInformation.password);
    this.phone_number = UserInformation.phone_number || "";
    this.work_location = UserInformation.work_location || "";
  }

  toJSON() {
    return {
      ID_company_tax: this.ID_company_tax,
      ID_FB: this.ID_FB,
      ID_user: this.ID_user,
      name: this.name,
      surname: this.surname,
      ssn: this.ssn,
      work_email: this.work_email,
      role: this.role,
      ADMIN: this.ADMIN,
      image: this.image,
      password: this.password,
      phone_number: this.phone_number,
      work_location: this.work_location,
    };
  }

  async FB_createUser() {
    const userData = this.toJSON();
    const email = userData.work_email;
    const password = generateTemporaryPassword();
    console.log("Contraseña temporal generada: ", password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid; 
      userData.UID = uid;

      const UserRef = doc(db, "EMPRESAS", userData.ID_company_tax, "USUARIO", uid);
      await setDoc(UserRef, userData);

      // Enviar correo de verificación con el UID en el enlace
      // await sendCustomVerificationEmail(user, uid);



      // await sendMail(user.email, uid, userData.ID_company_tax);
          // En lugar de llamar directamente a la función sendMail, hacemos una solicitud fetch a la API Route
      // Aquí es donde llamamos a la API para enviar el correo
      await this.sendMail(user.email, uid, userData.ID_company_tax);


      // 4. Retornar éxito
      return {
        success: true,
        user,
        message: "Usuario registrado correctamente en Firebase Authentication y Firestore",
      };
    } catch (error) {
      console.log("Error al registrar el usuario en Firebase Authentication o Firestore: ", error);
      return {
        success: false,
        message: `Error al registrar el usuario: ${error.message}`,
      };
    }
  }
   // Aquí es donde llamamos a la API para enviar el correo
   async sendMail(email, uid, ID_company_tax) {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uid, ID_company_tax }),
      });
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      if (data.success) {
        console.log('Correo enviado con éxito:', data.message);
      } else {
        console.error('Error enviando correo:', data.message);
      }
    } catch (error) {
      console.error('Error llamando a la API:', error);
      throw new Error('Error al llamar a la API de envío de correo.');
    }
  }
}

// Función para generar una contraseña temporal
export const generateTemporaryPassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

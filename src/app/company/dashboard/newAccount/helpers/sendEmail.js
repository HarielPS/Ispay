import { sendEmailVerification } from "firebase/auth";

// Función para enviar un correo de verificación personalizado
export const sendCustomVerificationEmail = async (user, uid) => {
  try {
    const verificationLink = `https://your-app.com/validateData/${uid}`;
    const emailContent = {
      to: user.email,
      subject: "Verifica tu cuenta",
      text: `Por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
      html: <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace: <a href="${verificationLink}">Verificar cuenta</a></p>,
    };

    // Utilizar la función sendEmailVerification para enviar el correo (o algún servicio de correos)
    await sendEmailVerification(user);
    console.log("Correo de verificación enviado a:", user.email);
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error);
  }
};
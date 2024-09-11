import emailjs from 'emailjs-com';

// Función para enviar el correo utilizando EmailJS
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, uid, ID_company_tax } = req.body;

    // Datos que enviaremos a la plantilla de EmailJS
    const templateParams = {
      to_name: email,  // destinatario
      verification_link: `https://ispay.netlify.app/validateData/${uid}?ID_company_tax=${ID_company_tax}`,  // Link de verificación
    };

    try {
      // Llamada a la función send de EmailJS
      const result = await emailjs.send(
        process.env.service_id,  // Reemplaza con el Service ID de tu plantilla en EmailJS
        process.env.template, // Reemplaza con el Template ID
        templateParams,
        process.env.user_id      // Reemplaza con el User ID de tu cuenta en EmailJS
      );

      // Si todo salió bien, respondemos con éxito
      return res.status(200).json({ success: true, message: 'Correo enviado con éxito', result });
    } catch (error) {
      // Si hubo un error, lo manejamos aquí
      console.error('Error enviando correo: ', error);
      return res.status(500).json({ success: false, message: 'Error enviando correo', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}

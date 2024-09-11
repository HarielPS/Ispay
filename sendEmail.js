import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, uid, ID_company_tax } = req.body;
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.gmail,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const verificationLink = `https://ispay.netlify.app/validateData/${uid}?ID_company_tax=${ID_company_tax}`;

      const mailOptions = {
        from: process.env.gmail,
        to: email,
        subject: 'Bienvenido a Ispay - Verifica tu cuenta',
        text: `Hola, Tu empresa te ha registrado. Por favor, da clic en el siguiente enlace para verificar tu cuenta: ${verificationLink}`,
        html: `<h1>Bienvenido a Ispay</h1><p>Tu empresa te ha registrado. Por favor, da clic en el siguiente enlace para verificar tu cuenta: <a href="${verificationLink}">Verificar cuenta</a></p>`,
      };

      const result = await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Correo enviado con éxito', result });
    } catch (error) {
      console.error('Error enviando correo: ', error);
      return res.status(500).json({ success: false, message: 'Error enviando correo', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}

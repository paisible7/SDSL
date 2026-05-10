require("dotenv").config();
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  ADSL_WHATSAPP_TO,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_TO,
  SMTP_FROM,
} = process.env;

// Middleware
app.use(cors()); // Autorise les requêtes depuis votre frontend Vue.js
app.use(express.json()); // Pour traiter les données JSON envoyées par le frontend

const isTwilioConfigured =
  TWILIO_ACCOUNT_SID?.startsWith("AC") &&
  TWILIO_AUTH_TOKEN &&
  TWILIO_WHATSAPP_FROM;

let client;
if (isTwilioConfigured) {
  client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
} else {
  console.warn(
    "Twilio non configuré ou identifiants invalides. Les envois WhatsApp ne seront pas disponibles.",
  );
}

// Transporteur SMTP pour l'envoi d'e-mails
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT || 587),
  secure: SMTP_PORT === "465",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Endpoint pour envoyer un message WhatsApp via le backend
app.post("/api/contact/whatsapp", (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  const toNumber = ADSL_WHATSAPP_TO;

  if (!isTwilioConfigured) {
    return res.status(500).json({
      success: false,
      message:
        "Twilio non configuré ou identifiants invalides. Merci de vérifier TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN et TWILIO_WHATSAPP_FROM.",
    });
  }

  if (!toNumber) {
    return res.status(400).json({
      success: false,
      message:
        "Numéro de destination WhatsApp non configuré (ADSL_WHATSAPP_TO).",
    });
  }

  const bodyText =
    `Nouveau message ADSL\n\n` +
    `De: ${name} (${phone})\n` +
    `Email: ${email || "non renseigné"}\n` +
    `Sujet: ${subject}\n\n` +
    `${message}`;

  client.messages
    .create({
      from: TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${toNumber}`,
      body: bodyText,
    })
    .then((message) => {
      console.log(`Message envoyé avec succès, SID: ${message.sid}`);
      res.json({ success: true, sid: message.sid });
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi WhatsApp :", error);
      res.status(500).json({ success: false, error: error.message });
    });
});

// Endpoint pour envoyer un e-mail via SMTP
app.post("/api/contact/email", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  const toEmail = SMTP_TO || SMTP_USER;

  if (!toEmail) {
    return res.status(400).json({
      success: false,
      message:
        "Adresse e-mail de destination non configurée (SMTP_TO ou SMTP_USER).",
    });
  }

  const mailOptions = {
    from: SMTP_FROM || SMTP_USER,
    to: toEmail,
    replyTo: email || undefined,
    subject: `Nouveau message de ${name}`,
    text: `De : ${name} (${phone})\nEmail : ${email || "non renseigné"}\nSujet : ${subject}\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail envoyé avec succès : ${info.messageId}`);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Erreur d'envoi e-mail :", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${port}`);
});

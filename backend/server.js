const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const twilio = require("twilio");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {
  buildContactEmailHtml,
  buildContactEmailText,
} = require("./emailTemplates");

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
  CORS_ORIGINS,
} = process.env;

const allowedOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : [];

// Middleware
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Origine non autorisée par CORS : ${origin}`));
    },
  }),
);
app.use(express.json()); // Pour traiter les données JSON envoyées par le frontend

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sdsl-api" });
});

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

const isSmtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

let transporter;
if (isSmtpConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_PORT === "465",
    requireTLS: SMTP_PORT !== "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn(
    "SMTP non configuré. Les envois par e-mail ne seront pas disponibles (SMTP_HOST, SMTP_USER, SMTP_PASS).",
  );
}

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
    `Nouveau message SDSL\n\n` +
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
      res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de l'envoi WhatsApp.",
      });
    });
});

// Endpoint pour envoyer un e-mail via SMTP
app.post("/api/contact/email", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  if (!isSmtpConfigured) {
    return res.status(500).json({
      success: false,
      message:
        "SMTP non configuré. Merci de vérifier SMTP_HOST, SMTP_USER et SMTP_PASS.",
    });
  }

  const toEmail = SMTP_TO || SMTP_USER;
  if (!toEmail) {
    return res.status(400).json({
      success: false,
      message:
        "Adresse e-mail de destination non configurée (SMTP_TO ou SMTP_USER).",
    });
  }

  if (!name?.trim() || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Le nom est requis (min. 2 caractères).",
    });
  }

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Une adresse e-mail valide est requise.",
    });
  }

  if (!message?.trim() || message.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: "Le message est trop court (min. 10 caractères).",
    });
  }

  const visitorName = name.trim();
  const visitorEmail = email.trim();
  const visitorPhone = phone?.trim() || "";
  const subjectLine = subject || "Demande de renseignement";
  const visitorMessage = message.trim();

  const emailContent = {
    visitorName,
    visitorEmail,
    phone: visitorPhone,
    subject: subjectLine,
    message: visitorMessage,
  };

  const mailOptions = {
    // Affiche le visiteur comme expéditeur ; l'envoi réel passe par le compte SMTP
    from: `"${visitorName}" <${visitorEmail}>`,
    sender: SMTP_USER,
    to: toEmail,
    replyTo: `"${visitorName}" <${visitorEmail}>`,
    subject: `[SDSL Contact] ${subjectLine} — ${visitorName}`,
    text: buildContactEmailText(emailContent),
    html: buildContactEmailHtml(emailContent),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail envoyé avec succès : ${info.messageId}`);
    res.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Erreur d'envoi e-mail :", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de l'envoi de l'e-mail.",
    });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${port}`);
});

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const {
  buildContactEmailHtml,
  buildContactEmailText,
} = require("./emailTemplates");

const app = express();
const port = process.env.PORT || 3000;

const {
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
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "sdsl-api" });
});

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

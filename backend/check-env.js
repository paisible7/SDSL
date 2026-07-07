#!/usr/bin/env node
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const { isSmtpConfigured } = require("./smtpConfig");

const keys = [
  "SMTP_TRANSPORT",
  "SENDMAIL_PATH",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_NO_AUTH",
  "SMTP_SECURE",
  "SMTP_TO",
  "SMTP_FROM",
  "PORT",
  "CORS_ORIGINS",
];

console.log("Fichier .env :", path.join(__dirname, ".env"));
console.log("");

for (const key of keys) {
  const value = process.env[key];
  if (!value) {
    console.log(`${key}= MANQUANT`);
  } else if (key.includes("PASS")) {
    console.log(`${key}= *** (${value.length} caractères)`);
  } else {
    console.log(`${key}= ${value}`);
  }
}

console.log("");
console.log("SMTP prêt :", isSmtpConfigured(process.env));
console.log("Lancer aussi : npm run test-smtp");

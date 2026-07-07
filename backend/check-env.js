#!/usr/bin/env node
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const keys = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
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
console.log(
  "SMTP prêt :",
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
);

#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const net = require("net");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const {
  buildSmtpTransportOptions,
  isSmtpConfigured,
  describeTransport,
} = require("./smtpConfig");

function testPort(host, port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, timeout: 3000 });
    socket.on("connect", () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log("=== Diagnostic SMTP (Hestia / VPS) ===\n");

  const sendmailPath = process.env.SENDMAIL_PATH || "/usr/sbin/sendmail";
  console.log(
    `Sendmail : ${sendmailPath} → ${fs.existsSync(sendmailPath) ? "présent" : "absent"}`,
  );

  const hosts = ["127.0.0.1", "localhost", "mail.sdsl-logistique.com"];
  const ports = [25, 587, 465];

  console.log("\nPorts SMTP testés :");
  for (const host of hosts) {
    for (const port of ports) {
      const open = await testPort(host, port);
      console.log(`  ${host}:${port} → ${open ? "OUVERT" : "fermé"}`);
    }
  }

  console.log("\nConfiguration .env actuelle :");
  console.log(`  SMTP_TRANSPORT=${process.env.SMTP_TRANSPORT || "smtp"}`);
  console.log(`  SMTP_HOST=${process.env.SMTP_HOST || "MANQUANT"}`);
  console.log(`  SMTP_PORT=${process.env.SMTP_PORT || "587"}`);
  console.log(`  SMTP_NO_AUTH=${process.env.SMTP_NO_AUTH || "false"}`);
  console.log(`  SMTP prêt : ${isSmtpConfigured(process.env)}`);

  if (!isSmtpConfigured(process.env)) {
    console.log("\nSur Hestia sans port SMTP local, utilisez :");
    console.log("  SMTP_TRANSPORT=sendmail");
    console.log("  SENDMAIL_PATH=/usr/sbin/sendmail");
    return;
  }

  const options = buildSmtpTransportOptions(process.env);
  const transporter = nodemailer.createTransport(options);

  console.log(`\nTest nodemailer via ${describeTransport(process.env)}...`);
  try {
    await transporter.verify();
    console.log("OK — envoi d'e-mails possible.");
  } catch (error) {
    console.error("ÉCHEC —", error.message);
    console.log("\nSur Hestia, si erreur de certificat avec localhost:587 :");
    console.log("  Option A (recommandé) : SMTP_TRANSPORT=sendmail");
    console.log("  Option B : SMTP_HOST=127.0.0.1 SMTP_PORT=25 SMTP_NO_AUTH=true");
    console.log("  Option C : SMTP_HOST=mail.sdsl-logistique.com SMTP_PORT=465 SMTP_SECURE=true");
  }
}

main();

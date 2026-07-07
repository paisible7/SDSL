#!/usr/bin/env node
const path = require("path");
const net = require("net");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const {
  buildSmtpTransportOptions,
  isSmtpConfigured,
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

  const hosts = ["127.0.0.1", "localhost"];
  const ports = [25, 587, 465];

  console.log("Ports ouverts en local :");
  for (const host of hosts) {
    for (const port of ports) {
      const open = await testPort(host, port);
      console.log(`  ${host}:${port} → ${open ? "OUVERT" : "fermé"}`);
    }
  }

  console.log("\nConfiguration .env actuelle :");
  console.log(`  SMTP_HOST=${process.env.SMTP_HOST || "MANQUANT"}`);
  console.log(`  SMTP_PORT=${process.env.SMTP_PORT || "587"}`);
  console.log(`  SMTP_NO_AUTH=${process.env.SMTP_NO_AUTH || "false"}`);
  console.log(`  SMTP prêt : ${isSmtpConfigured(process.env)}`);

  if (!isSmtpConfigured(process.env)) {
    console.log("\nComplétez SMTP_HOST (et auth ou SMTP_NO_AUTH=true).");
    return;
  }

  const options = buildSmtpTransportOptions(process.env);
  const transporter = nodemailer.createTransport(options);

  console.log(`\nTest connexion nodemailer sur ${options.host}:${options.port}...`);
  try {
    await transporter.verify();
    console.log("OK — connexion SMTP réussie.");
  } catch (error) {
    console.error("ÉCHEC —", error.message);
    console.log("\nEssayez dans .env (selon ports ouverts ci-dessus) :");
    console.log("  Option A (souvent Hestia) : SMTP_HOST=127.0.0.1 SMTP_PORT=25 SMTP_NO_AUTH=true");
    console.log("  Option B : SMTP_HOST=mail.sdsl-logistique.com SMTP_PORT=465 SMTP_SECURE=true");
  }
}

main();

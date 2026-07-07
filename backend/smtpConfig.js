const fs = require("fs");

function usesSendmail(env = process.env) {
  return env.SMTP_TRANSPORT === "sendmail";
}

function buildSmtpTransportOptions(env = process.env) {
  if (usesSendmail(env)) {
    return {
      sendmail: true,
      newline: "unix",
      path: env.SENDMAIL_PATH || "/usr/sbin/sendmail",
    };
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    SMTP_REQUIRE_TLS,
    SMTP_NO_AUTH,
  } = env;

  const port = Number(SMTP_PORT || 587);
  const isLocalHost = ["localhost", "127.0.0.1"].includes(SMTP_HOST);
  const options = {
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE === "true" || port === 465,
  };

  if (SMTP_REQUIRE_TLS === "false" || port === 25) {
    options.requireTLS = false;
  } else if (!options.secure) {
    options.requireTLS = true;
  }

  // Exim local : certificat souvent au nom du VPS, pas "localhost"
  if (isLocalHost) {
    options.tls = { rejectUnauthorized: false };
  }

  if (SMTP_NO_AUTH !== "true") {
    options.auth = {
      user: SMTP_USER,
      pass: SMTP_PASS,
    };
  }

  return options;
}

function isSmtpConfigured(env = process.env) {
  if (usesSendmail(env)) {
    const sendmailPath = env.SENDMAIL_PATH || "/usr/sbin/sendmail";
    return fs.existsSync(sendmailPath);
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_NO_AUTH } = env;
  if (!SMTP_HOST) return false;
  if (SMTP_NO_AUTH === "true") return true;
  return Boolean(SMTP_USER && SMTP_PASS);
}

function describeTransport(env = process.env) {
  if (usesSendmail(env)) {
    return `sendmail (${env.SENDMAIL_PATH || "/usr/sbin/sendmail"})`;
  }

  const options = buildSmtpTransportOptions(env);
  return (
    `${options.host}:${options.port}` + (options.auth ? " (auth)" : " (sans auth)")
  );
}

module.exports = {
  buildSmtpTransportOptions,
  isSmtpConfigured,
  usesSendmail,
  describeTransport,
};

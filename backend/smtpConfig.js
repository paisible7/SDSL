function buildSmtpTransportOptions(env = process.env) {
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

  if (SMTP_NO_AUTH !== "true") {
    options.auth = {
      user: SMTP_USER,
      pass: SMTP_PASS,
    };
  }

  return options;
}

function isSmtpConfigured(env = process.env) {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_NO_AUTH } = env;
  if (!SMTP_HOST) return false;
  if (SMTP_NO_AUTH === "true") return true;
  return Boolean(SMTP_USER && SMTP_PASS);
}

module.exports = {
  buildSmtpTransportOptions,
  isSmtpConfigured,
};

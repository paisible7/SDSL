function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactEmailText({ visitorName, visitorEmail, phone, subject, message }) {
  const subjectLine = subject || "Demande de renseignement";

  return (
    `Nouveau message depuis le formulaire de contact SDSL\n\n` +
    `Nom : ${visitorName}\n` +
    `Email : ${visitorEmail}\n` +
    (phone ? `Téléphone : ${phone}\n` : "") +
    `Sujet : ${subjectLine}\n\n` +
    `${message}`
  );
}

function buildInfoRow(label, valueHtml, isLast = false) {
  const border = isLast ? "" : "border-bottom:1px solid #e2e8f0;";

  return `<tr>
    <td class="info-label" style="padding:12px 16px;${border}color:#64748b;font-size:13px;width:120px;vertical-align:top;mso-line-height-rule:exactly;">${label}</td>
    <td class="info-value" style="padding:12px 16px;${border}color:#0f172a;font-size:14px;vertical-align:top;word-break:break-word;mso-line-height-rule:exactly;">${valueHtml}</td>
  </tr>`;
}

function buildContactEmailHtml({ visitorName, visitorEmail, phone, subject, message }) {
  const subjectLine = subject || "Demande de renseignement";
  const safeName = escapeHtml(visitorName);
  const safeEmail = escapeHtml(visitorEmail);
  const safePhone = phone ? escapeHtml(phone) : "";
  const safeSubject = escapeHtml(subjectLine);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const phoneRow = phone
    ? buildInfoRow("Téléphone", `<span style="font-weight:500;">${safePhone}</span>`)
    : "";

  const infoRows =
    buildInfoRow("Nom", `<span style="font-weight:600;">${safeName}</span>`) +
    buildInfoRow(
      "Email",
      `<a href="mailto:${safeEmail}" style="color:#1d4ed8;font-weight:500;text-decoration:none;word-break:break-all;">${safeEmail}</a>`,
    ) +
    phoneRow +
    buildInfoRow(
      "Sujet",
      `<span style="display:inline-block;background-color:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:600;padding:4px 10px;border-radius:999px;max-width:100%;word-break:break-word;">${safeSubject}</span>`,
      true,
    );

  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Nouveau message SDSL</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 16px 10px !important; }
      .email-card { width: 100% !important; max-width: 100% !important; border-radius: 10px !important; }
      .header-cell { padding: 22px 18px !important; }
      .header-title { font-size: 20px !important; line-height: 1.35 !important; }
      .header-subtitle { font-size: 11px !important; }
      .body-cell { padding: 20px 18px 8px !important; }
      .message-cell { padding: 8px 18px 20px !important; }
      .button-cell { padding: 0 18px 22px !important; }
      .footer-cell { padding: 16px 18px !important; }
      .intro-text { font-size: 14px !important; }

      .info-label,
      .info-value {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }

      .info-label {
        padding: 12px 16px 4px !important;
        border-bottom: none !important;
        font-size: 12px !important;
      }

      .info-value {
        padding: 0 16px 14px !important;
        border-bottom: 1px solid #e2e8f0 !important;
        font-size: 15px !important;
      }

      .info-table tr:last-child .info-value {
        border-bottom: none !important;
        padding-bottom: 8px !important;
      }

      .message-box {
        padding: 16px !important;
        font-size: 15px !important;
      }

      .reply-button {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        text-align: center !important;
        padding: 14px 16px !important;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;word-break:break-word;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Nouveau message de ${safeName} — ${safeSubject}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-wrapper" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-card" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(15,23,42,0.06);">
          <tr>
            <td class="header-cell" style="background:linear-gradient(135deg,#1d4ed8 0%,#1e40af 100%);padding:28px 32px;">
              <p class="header-subtitle" style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#bfdbfe;">SDSL — Société Delta Service Logistique</p>
              <h1 class="header-title" style="margin:0;font-size:22px;line-height:1.3;font-weight:700;color:#ffffff;">Nouveau message de contact</h1>
            </td>
          </tr>

          <tr>
            <td class="body-cell" style="padding:28px 32px 8px;">
              <p class="intro-text" style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#475569;">
                Un visiteur a envoyé une demande via le formulaire du site. Vous pouvez répondre directement à cet e-mail.
              </p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="info-table" style="width:100%;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background-color:#f8fafc;">
                ${infoRows}
              </table>
            </td>
          </tr>

          <tr>
            <td class="message-cell" style="padding:8px 32px 28px;">
              <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#64748b;">Message</p>
              <div class="message-box" style="background-color:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #1d4ed8;border-radius:10px;padding:18px 20px;font-size:15px;line-height:1.7;color:#334155;word-break:break-word;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <tr>
            <td class="button-cell" style="padding:0 32px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#1d4ed8;border-radius:8px;text-align:center;">
                    <a class="reply-button" href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subjectLine}`)}" style="display:inline-block;padding:12px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;word-break:break-word;">Répondre à ${safeName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="footer-cell" style="padding:18px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#94a3b8;text-align:center;">
                Message envoyé depuis le formulaire de contact — sdsl-logistique.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = {
  buildContactEmailHtml,
  buildContactEmailText,
};

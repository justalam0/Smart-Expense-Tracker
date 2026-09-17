const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends a simple text email using Resend HTTP API.
 */
async function sendEmail(to, subject, text) {
  try {
    await resend.emails.send({
      from: `"FinTrack" <onboarding@resend.dev>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error("Email sending failed:", err.message);
  }
}

module.exports = { sendEmail };
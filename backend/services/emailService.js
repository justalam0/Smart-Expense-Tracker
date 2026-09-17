/**
 * General email service using Brevo (Sendinblue) HTTP API.
 * Used for budget alerts, weekly summaries, etc.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

async function sendEmail(to, subject, text) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not configured, skipping email');
    return;
  }

  const senderEmail = process.env.EMAIL_USER || 'noreply@fintrack.com';

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'FinTrack', email: senderEmail },
        to: [{ email: to }],
        subject,
        textContent: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Brevo API error: ${response.status}`);
    }

    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error('Email sending failed:', err.message);
  }
}

module.exports = { sendEmail };
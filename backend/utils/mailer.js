/**
 * Sends OTP email using Brevo (Sendinblue) HTTP API.
 * Uses HTTPS (port 443) — NOT blocked by Render free tier.
 * Works without custom domain — Brevo sends via their own domain.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const sendOTP = async (to, otp) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('BREVO_API_KEY is not configured');
  }

  const senderEmail = process.env.EMAIL_USER || 'noreply@fintrack.com';

  const payload = {
    sender: { name: 'FinTrack', email: senderEmail },
    to: [{ email: to }],
    subject: 'FinTrack - Your OTP Verification Code',
    htmlContent: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2>Welcome to FinTrack</h2>
      <p>Your OTP verification code is:</p>
      <h1 style="color: #4338ca; letter-spacing: 5px;">${otp}</h1>
      <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
    </div>`
  };

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Brevo API error:', response.status, errorData);
    throw new Error(errorData.message || `Brevo API error: ${response.status}`);
  }

  const result = await response.json();
  console.log('OTP email sent successfully via Brevo:', result.messageId);
};

module.exports = { sendOTP };

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (to, otp) => {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'FinTrack <onboarding@resend.dev>';
  
  const { error } = await resend.emails.send({
    from: fromEmail,
    to,
    subject: 'FinTrack - Your OTP Verification Code',
    html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2>Welcome to FinTrack</h2>
      <p>Your OTP verification code is:</p>
      <h1 style="color: #4338ca; letter-spacing: 5px;">${otp}</h1>
      <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
    </div>`
  });

  if (error) {
    console.error('Resend API error:', error);
    throw new Error(error.message || 'Failed to send email via Resend');
  }
};

module.exports = { sendOTP };

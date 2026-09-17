const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (to, otp) => {
  await resend.emails.send({
    from: 'FinTrack <onboarding@resend.dev>',
    to,
    subject: 'FinTrack - Your OTP Verification Code',
    html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h2>Welcome to FinTrack</h2>
      <p>Your OTP verification code is:</p>
      <h1 style="color: #4338ca; letter-spacing: 5px;">${otp}</h1>
      <p>This code is valid for 10 minutes. Do not share it with anyone.</p>
    </div>`
  });
};

module.exports = { sendOTP };

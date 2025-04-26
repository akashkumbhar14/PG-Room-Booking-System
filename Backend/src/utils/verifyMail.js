const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public'))); // 'public' folder should contain index.html, app.js, etc.

const GMAIL_USER = 'akashkumbhar0014@gmail.com'; //keep your mail here  
const GMAIL_APP_PASSWORD = 'ousy ehcf ycvn vjig'; //

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  }
});

const codes = {}; // temporary store

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// API: Send verification code
app.post('/send-code', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const code = generateVerificationCode();
  codes[email] = code;

  const mailOptions = {
    from: GMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    html: `<p>Your email verification code is: <strong>${code}</strong></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent code ${code} to ${email}`);
    res.json({ message: 'Verification code sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// API: Verify the code
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code || !codes[email]) {
    return res.status(400).json({ message: 'Invalid verification request' });
  }

  if (codes[email] === code) {
    delete codes[email];
    return res.json({ message: 'Email verified successfully' });
  } else {
    return res.status(400).json({ message: 'Incorrect code' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

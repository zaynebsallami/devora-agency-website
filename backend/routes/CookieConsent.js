import express from 'express';
import CookieConsent from '../models/CookieConsent.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Admin email setup (All-Inkl)
const ADMIN_EMAIL = 'admin@devora.de'; // replace with your admin email
const transporter = nodemailer.createTransport({
  host: '****.kasserver.com',   // replace with All-Inkl SMTP host
  port: 587,
  secure: false, 
  auth: {
    user: process.env.ADMIN_EMAIL_USER, 
    pass: process.env.ADMIN_EMAIL_PASS
  }
});

// POST /api/cookie-consent
router.post('/', async (req, res) => {
  try {
    const { type } = req.body;
    if (!['all', 'essential', 'revoked'].includes(type)) {
      return res.status(400).json({ error: 'Invalid consent type' });
    }

    // IP & User-Agent
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Save in DB
    const consent = new CookieConsent({ type, ip, userAgent });
    await consent.save();
    console.log('💾 Cookie consent saved');

    // Send admin email
    const mailOptions = {
      from: `"DEVORA Website" <${process.env.ADMIN_EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Cookie Consent: ${type.toUpperCase()}`,
      html: `
        <h3>New Cookie Consent Received</h3>
        <ul>
          <li><strong>Type:</strong> ${type}</li>
          <li><strong>IP:</strong> ${ip}</li>
          <li><strong>User-Agent:</strong> ${userAgent}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
      `
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error('Email error:', err);
      else console.log('Admin email sent:', info.response);
    });

    return res.status(200).json({ message: 'Consent logged and admin notified' });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;

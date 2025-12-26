import express from "express";
import dotenv from "dotenv";
import Brevo from "@getbrevo/brevo";
import Contact from "../models/Contact.js"; // <-- add this

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, company, email, projectType, message, privacyAccepted } = req.body;

  if (!name || !email || !projectType || !message || !privacyAccepted) {
    return res.status(400).json({
      success: false,
      message: "Bitte alle Pflichtfelder ausfüllen",
    });
  }

  const emailContent = `
Name: ${name}
Firma: ${company || "-"}
Email: ${email}
Projektart: ${projectType}
Nachricht:
${message}
  `;

  try {
    // 1️⃣ Save to database
    const newContact = new Contact({
      name, company, email, projectType, message, privacyAccepted
    });
    await newContact.save();
    console.log("💾 Contact saved to database");

    // 2️⃣ Send email via Brevo
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = {
      sender: { name: "Devora Website", email: "kontakt@devora.de" },
      to: [{ email: process.env.RECEIVER_EMAIL }],
      subject: `Neue Nachricht von ${name}`,
      textContent: emailContent,
      htmlContent: `<pre>${emailContent}</pre>`,
      replyTo: { email },
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("📨 Email sent via Brevo");

    res.status(200).json({ success: true, message: "Nachricht erfolgreich gesendet!" });

  } catch (err) {
    console.error("❌ Error:", err.response?.body || err);
    res.status(500).json({
      success: false,
      message: "Fehler beim Speichern oder Senden der Anfrage."
    });
  }
});

export default router;

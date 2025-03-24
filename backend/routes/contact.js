import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Nodemailer SMTP Setup for Custom Domain
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_PORT == 465, // SSL ke liye true, TLS ke liye false
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Email Options
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: "New Contact Form Submission",
            html: `<h3>New Message from Contact Form</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        res.json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;

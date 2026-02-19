const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async(req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).send("All fields are required.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_TO,
        subject: `Contact Form: ${subject}`,
        text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully!");
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).send("Failed to send message.");
    }
});

// Use 3001 by default to avoid conflicting with dev preview servers on 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
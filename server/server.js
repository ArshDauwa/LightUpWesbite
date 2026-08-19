import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const appDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(appDirectory, "../dist");

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_EMAIL || "contact@lightupgenerators.com";

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: smtpUser,
    replyTo: email,
    to: toEmail,
    subject: `Website contact request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service || "N/A"}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone || "N/A"}</p>
           <p><strong>Service:</strong> ${service || "N/A"}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, "<br />")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ error: "Failed to send the message." });
  }
});

const prerenderedRoutes = [
  "/",
  "/generators/residential-standby",
  "/generators/commercial-standby",
  "/generators/portable",
  "/privacy-policy",
  "/terms-of-service",
];

app.get(prerenderedRoutes, (req, res) => {
  const routeFile = req.path === "/" ? "index.html" : path.join(req.path.slice(1), "index.html");
  res.sendFile(path.join(distDirectory, routeFile));
});

app.use(express.static(distDirectory));
app.get("*", (req, res) => {
  res.sendFile(path.join(distDirectory, "index.html"));
});

app.listen(port, () => {
  console.log(`Contact email API server running on http://localhost:${port}`);
});

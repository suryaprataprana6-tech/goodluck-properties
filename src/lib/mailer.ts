import nodemailer from "nodemailer";
import { Lead, getSettings, addLog } from "./db";

export async function sendLeadEmailNotification(lead: Lead): Promise<boolean> {
  const settings = getSettings();
  
  // Settings values or environment variables fallback
  const user = settings.smtpEmail || process.env.SMTP_USER;
  const pass = settings.smtpAppPassword || process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  
  const toEmails = ["propertiesgoodluck2024@gmail.com", "amitv701183@gmail.com"];

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #114c33; max-width: 600px; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <div style="background-color: #051a10; color: #ffffff; padding: 20px; text-align: center; border-bottom: 2px solid #d4af37;">
        <h1 style="margin: 0; font-size: 20px; font-family: Georgia, serif; letter-spacing: 1px; color: #ecc56c;">GOODLUCK PROPERTIES</h1>
        <span style="font-size: 11px; text-transform: uppercase; tracking: 2px; color: #f8f9fa;">New VIP Lead Received</span>
      </div>
      <div style="padding: 24px; background-color: #fcfcfc;">
        <h2 style="font-size: 16px; margin-top: 0; color: #051a10; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Lead Specification Sheet</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; width: 140px;">Full Name:</td>
            <td style="padding: 8px 0; color: #2d3748;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Mobile Number:</td>
            <td style="padding: 8px 0; color: #2d3748;"><strong>${lead.phone}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Email Address:</td>
            <td style="padding: 8px 0; color: #2d3748;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Project Interest:</td>
            <td style="padding: 8px 0; color: #051a10; font-weight: 500;">${lead.propertyInterest}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Budget Segment:</td>
            <td style="padding: 8px 0; color: #a78b3c; font-weight: bold;">${lead.budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; vertical-align: top;">Client Message:</td>
            <td style="padding: 8px 0; color: #4a5568;">${lead.message}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; border-top: 1px solid #e2e8f0; padding-top: 12px;">Source Route:</td>
            <td style="padding: 8px 0; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 12px; font-style: italic;">${lead.sourcePage}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Timestamp:</td>
            <td style="padding: 8px 0; color: #718096; font-family: monospace;">${lead.submittedAt}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; text-align: center; font-size: 11px; color: #718096; border-top: 1px solid #e2e8f0;">
        This lead was securely validated and processed by Goodluck Properties CRM.
      </div>
    </div>
  `;

  if (!user || !pass) {
    const errorMsg = "SMTP credentials (smtpEmail & smtpAppPassword) not set. Email delivery bypassed.";
    console.log(`⚠️ ${errorMsg}`);
    addLog("email", lead.id, toEmails.join(", "), "failure", errorMsg);
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Goodluck CRM Desk" <${user}>`,
      to: toEmails.join(", "),
      subject: `New Property Lead - Goodluck Properties`,
      html: emailBody,
    });

    console.log(`📧 Lead email notification dispatched successfully for ${lead.name}`);
    addLog("email", lead.id, toEmails.join(", "), "success", "Email notification sent successfully via SMTP.");
    return true;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Nodemailer delivery failure:", error);
    addLog("email", lead.id, toEmails.join(", "), "failure", `Nodemailer delivery failure: ${errorMsg}`);
    return false;
  }
}

/**
 * Direct Connection test helper for Settings page
 */
export async function testSMTPConnection(
  smtpEmail: string,
  smtpAppPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!smtpEmail || !smtpAppPassword) {
      return { success: false, message: "SMTP credentials cannot be empty." };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpEmail,
        pass: smtpAppPassword,
      },
    });

    await transporter.verify();
    return { success: true, message: "SMTP connection verified successfully!" };
  } catch (error) {
    console.error("❌ SMTP test verify failure:", error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: `SMTP verify failure: ${errorMsg}` };
  }
}

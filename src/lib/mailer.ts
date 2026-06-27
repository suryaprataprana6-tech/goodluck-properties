import nodemailer from "nodemailer";
import { Lead, getSettings, addLog } from "./db";

export async function sendLeadEmailNotification(lead: Lead): Promise<boolean> {
  const settings = getSettings();
  
  // SMTP Credentials from Settings DB or Environment variables fallback
  const user = settings.smtpEmail || process.env.SMTP_EMAIL;
  const pass = settings.smtpAppPassword || process.env.SMTP_PASSWORD;
  const host = "smtp.gmail.com";
  
  // Destination Desk: Environment variable or fallback target
  const toEmail = process.env.NOTIFICATION_EMAIL || "goodluckproperties682@gmail.com";

  const emailBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #114c33; max-width: 600px; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <div style="background-color: #051a10; color: #ffffff; padding: 20px; text-align: center; border-bottom: 2px solid #d4af37;">
        <h1 style="margin: 0; font-size: 20px; font-family: Georgia, serif; letter-spacing: 1px; color: #ecc56c;">GOODLUCK PROPERTIES</h1>
        <span style="font-size: 11px; text-transform: uppercase; tracking: 2px; color: #f8f9fa;">New Property Lead Received</span>
      </div>
      <div style="padding: 24px; background-color: #fcfcfc;">
        <h2 style="font-size: 16px; margin-top: 0; color: #051a10; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Lead Specification Sheet</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; width: 140px;">Name:</td>
            <td style="padding: 8px 0; color: #2d3748;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Mobile:</td>
            <td style="padding: 8px 0; color: #2d3748;"><strong>${lead.phone}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Email:</td>
            <td style="padding: 8px 0; color: #2d3748;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Property Interest:</td>
            <td style="padding: 8px 0; color: #051a10; font-weight: 500;">${lead.propertyInterest}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Budget:</td>
            <td style="padding: 8px 0; color: #a78b3c; font-weight: bold;">${lead.budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; vertical-align: top;">Message:</td>
            <td style="padding: 8px 0; color: #4a5568;">${lead.message}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10; border-top: 1px solid #e2e8f0; padding-top: 12px;">Source:</td>
            <td style="padding: 8px 0; color: #718096; border-top: 1px solid #e2e8f0; padding-top: 12px; font-style: italic;">${lead.sourcePage}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #051a10;">Date:</td>
            <td style="padding: 8px 0; color: #718096; font-family: monospace;">${new Date(lead.submittedAt).toLocaleString("en-IN")}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f7fafc; padding: 15px; text-align: center; font-size: 11px; color: #718096; border-top: 1px solid #e2e8f0;">
        This lead was securely processed by Goodluck Properties CRM.
      </div>
    </div>
  `;

  if (!user || !pass) {
    const errorMsg = "SMTP Credentials (SMTP_EMAIL & SMTP_PASSWORD) not configured. Email dispatch bypassed.";
    console.log(`⚠️ ${errorMsg}`);
    addLog(lead.id, toEmail, "failure", errorMsg);
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
      to: toEmail,
      subject: `New Property Lead - Goodluck Properties`,
      html: emailBody,
    });

    console.log(`📧 Lead email notification dispatched successfully to ${toEmail}`);
    addLog(lead.id, toEmail, "success", `Email notification sent successfully to ${toEmail}.`);
    return true;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Nodemailer delivery failure:", error);
    addLog(lead.id, toEmail, "failure", `Nodemailer delivery failure: ${errorMsg}`);
    return false;
  }
}

/**
 * Direct Test Email sender for Settings page
 */
export async function sendTestEmail(
  smtpEmail: string,
  smtpAppPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!smtpEmail || !smtpAppPassword) {
      return { success: false, message: "SMTP credentials cannot be empty." };
    }

    const toEmail = process.env.NOTIFICATION_EMAIL || "goodluckproperties682@gmail.com";

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: smtpEmail,
        pass: smtpAppPassword,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // Send actual test email
    await transporter.sendMail({
      from: `"Goodluck CRM Test" <${smtpEmail}>`,
      to: toEmail,
      subject: "Goodluck Properties SMTP Test Email",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #114c33; max-width: 500px; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden; padding: 20px;">
          <h2 style="color: #051a10; margin-top: 0;">Goodluck CRM Test</h2>
          <p>SMTP integration test initiated successfully! Your credentials are valid and active.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 11px; color: #718096;">Sent to target email desk: <strong>${toEmail}</strong></p>
        </div>
      `,
    });

    // Record Log entry
    addLog("TEST_RUN", toEmail, "success", "SMTP Test Email dispatched successfully.");

    return { success: true, message: `Test email dispatched successfully to ${toEmail}!` };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ SMTP test verify failure:", error);
    addLog("TEST_RUN", "N/A", "failure", `SMTP test fail: ${errorMsg}`);
    return { success: false, message: `SMTP verify failure: ${errorMsg}` };
  }
}

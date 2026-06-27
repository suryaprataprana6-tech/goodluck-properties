"use server";

import { headers } from "next/headers";
import {
  saveLead,
  updateLeadStatus,
  Lead,
  getSettings,
  saveSettings,
  getLogs,
  PipelineLog,
  Settings,
} from "@/lib/db";
import { sendLeadEmailNotification, sendTestEmail } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rateLimit";

interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  whatsappUrl?: string;
  lead?: Lead;
}

export async function submitLeadAction(
  prevState: unknown,
  formData: FormData
): Promise<LeadSubmissionResponse> {
  console.log("📥 [Form Received]: Processing form fields for submission...");

  // 1. Honeypot check for spam protection
  try {
    const honeypot = formData.get("honeypot") as string;
    if (honeypot && honeypot.trim() !== "") {
      console.log("🚫 Spam submission intercepted via Honeypot check.");
      return {
        success: true,
        message: "Your inquiry has been processed successfully.",
      };
    }
  } catch (e) {
    console.error("Honeypot check error (non-fatal):", e);
  }

  // 2. Client-IP Rate limiting
  try {
    const headerList = await headers();
    const forwardedFor = headerList.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      console.log(`🚫 Rate limit triggered for client IP: ${clientIp}`);
      return {
        success: false,
        message: "Too many submission attempts. Please try again after 2 minutes.",
      };
    }
  } catch (e) {
    console.error("Rate limit check error (non-fatal, proceeding):", e);
  }

  // 3. Field Extraction & Validation
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = (formData.get("email") as string) || "N/A";
  const propertyInterest = (formData.get("project") as string) || "General Query";
  const budget = (formData.get("budget") as string) || "N/A";
  const message = (formData.get("message") as string) || "N/A";
  const sourcePage = (formData.get("sourcePage") as string) || "Goodluck Properties Portal";

  if (!name || !phone) {
    return {
      success: false,
      message: "Full Name and Mobile Number are required.",
    };
  }

  // Phone validation
  const phoneClean = phone.replace(/[^0-9+]/g, "");
  if (phoneClean.length < 10) {
    return {
      success: false,
      message: "Please enter a valid 10-digit mobile number.",
    };
  }

  // 4. Save to CRM database (fault-tolerant)
  let lead: Lead | null = null;
  try {
    lead = await saveLead({
      name,
      phone: phoneClean,
      email,
      propertyInterest,
      budget,
      message,
      sourcePage,
    });
    console.log(`✅ [Lead Saved]: Lead saved successfully with ID: ${lead.id}`);
  } catch (dbError) {
    console.error("❌ [Database Error]: Failed to persist lead (non-fatal):", dbError);
    // Construct a transient lead object so email notification can still proceed
    lead = {
      id: `lead_${Date.now()}_transient`,
      name,
      phone: phoneClean,
      email,
      propertyInterest,
      budget,
      message,
      submittedAt: new Date().toISOString(),
      sourcePage,
      status: "New",
    };
    console.log("⚠️ [Fallback]: Created transient lead object for email dispatch.");
  }

  // 5. Send Email Notification via Web3Forms (fault-tolerant)
  try {
    const emailSent = await sendLeadEmailNotification(lead);
    console.log(`📧 [Email Sent]: Dispatcher result = ${emailSent}`);
  } catch (emailError) {
    console.error("❌ [Email Error]: Web3Forms dispatch failed (non-fatal):", emailError);
  }

  // 6. Generate WhatsApp Link
  const waText = `🚨 *New Property Lead Received*

👤 *Name*: ${lead.name}
📞 *Mobile*: ${lead.phone}
📧 *Email*: ${lead.email}
🏡 *Interest*: ${lead.propertyInterest}
💰 *Budget*: ${lead.budget}
💬 *Message*: ${lead.message}

📍 *Source*: ${lead.sourcePage}
🕒 *Date*: ${new Date(lead.submittedAt).toLocaleString("en-IN")}
`;

  const whatsappUrl = `https://wa.me/919315381500?text=${encodeURIComponent(waText)}`;

  return {
    success: true,
    message: "Thank you! Our team will contact you shortly.",
    whatsappUrl,
    lead,
  };
}

/**
 * Updates a lead status record
 */
export async function updateLeadStatusAction(
  leadId: string,
  newStatus: Lead["status"]
): Promise<{ success: boolean; message: string }> {
  try {
    const success = await updateLeadStatus(leadId, newStatus);
    if (!success) {
      return { success: false, message: "Lead not found." };
    }
    return { success: true, message: `Lead status updated to: ${newStatus}` };
  } catch (error) {
    console.error("❌ Action status update error:", error);
    return { success: false, message: "Could not update status." };
  }
}

/**
 * Fetches dynamic credentials settings
 */
export async function getSettingsAction(): Promise<Settings> {
  return await getSettings();
}

/**
 * Saves dynamic credentials settings
 */
export async function saveSettingsAction(
  settings: Settings
): Promise<{ success: boolean; message: string }> {
  try {
    await saveSettings(settings);
    return { success: true, message: "Settings saved successfully." };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Failed to save settings: ${errorMsg}` };
  }
}

/**
 * Triggers a real Web3Forms test email
 */
export async function sendTestEmailAction(
  settings: Settings
): Promise<{ success: boolean; message: string }> {
  return await sendTestEmail(settings.web3FormsKey);
}

/**
 * Returns pipeline delivery log entries
 */
export async function getPipelineLogsAction(): Promise<PipelineLog[]> {
  const logs = await getLogs();
  return [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

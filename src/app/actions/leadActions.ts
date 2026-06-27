"use server";

import { headers } from "next/headers";
import { saveLead, updateLeadStatus, Lead } from "@/lib/db";
import { syncLeadToGoogleSheets } from "@/lib/sheets";
import { sendLeadEmailNotification } from "@/lib/mailer";
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
  try {
    // 1. Honeypot check for spam protection
    const honeypot = formData.get("honeypot") as string;
    if (honeypot && honeypot.trim() !== "") {
      console.log("🚫 Spam submission intercepted via Honeypot check.");
      return {
        success: true,
        message: "Your inquiry has been processed successfully.",
      };
    }

    // 2. Client-IP Rate limiting
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

    // 4. Save to database
    const lead = saveLead({
      name,
      phone: phoneClean,
      email,
      propertyInterest,
      budget,
      message,
      sourcePage,
    });

    console.log(`✅ [CRM System] Lead captured successfully: ${lead.name} (${lead.id})`);

    // 5. Sync to Google Sheets
    await syncLeadToGoogleSheets(lead);

    // 6. Nodemailer Email Notifications
    await sendLeadEmailNotification(lead);

    // 7. Generate WhatsApp Link for Direct WhatsApp Notifications
    // Triggers notification send out to 9315381500 & 9582505055 via pre-filled text
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

    // WhatsApp API redirect link
    const whatsappUrl = `https://wa.me/919315381500?text=${encodeURIComponent(waText)}`;

    return {
      success: true,
      message: "Lead submitted successfully. Our agent will contact you shortly.",
      whatsappUrl,
      lead,
    };
  } catch (error) {
    console.error("❌ Action submission error:", error);
    return {
      success: false,
      message: "An internal server error occurred. Please try again.",
    };
  }
}

/**
 * Updates a lead status record (New, Contacted, Site Visit Scheduled, Follow Up, Converted)
 */
export async function updateLeadStatusAction(
  leadId: string,
  newStatus: Lead["status"]
): Promise<{ success: boolean; message: string }> {
  try {
    const success = updateLeadStatus(leadId, newStatus);
    if (!success) {
      return { success: false, message: "Lead not found." };
    }
    return { success: true, message: `Lead status updated to: ${newStatus}` };
  } catch (error) {
    console.error("❌ Action status update error:", error);
    return { success: false, message: "Could not update status." };
  }
}

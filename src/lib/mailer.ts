import { Lead, getSettings, addLog } from "./db";

export async function sendLeadEmailNotification(lead: Lead): Promise<boolean> {
  const settings = await getSettings();
  
  // Web3Forms Key from settings or environment variables fallback
  const accessKey = settings.web3FormsKey || process.env.WEB3FORMS_ACCESS_KEY;
  const toEmail = "goodluckproperties682@gmail.com";

  if (!accessKey) {
    const errorMsg = "Web3Forms Access Key not configured. Email dispatch bypassed.";
    console.log(`⚠️ ${errorMsg}`);
    await addLog(lead.id, toEmail, "failure", errorMsg);
    return false;
  }

  try {
    const formattedDate = new Date(lead.submittedAt).toLocaleString("en-IN");
    
    // Construct Web3Forms submit payload
    const payload = {
      access_key: accessKey,
      subject: "New Property Lead - Goodluck Properties",
      from_name: "Goodluck CRM Portal",
      name: lead.name,
      mobile: lead.phone,
      email: lead.email,
      propertyInterest: lead.propertyInterest,
      budget: lead.budget,
      message: lead.message,
      source: lead.sourcePage,
      date: formattedDate,
    };

    const targetUrl = "https://api.web3forms.com/submit";
    console.log(`🚀 [Web3Forms Sync] Submitting lead to URL: ${targetUrl}...`);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const rawText = await response.text();

    console.log(`🌐 [Web3Forms Sync Log] URL: ${targetUrl}`);
    console.log(`🌐 [Web3Forms Sync Log] HTTP Status: ${response.status}`);
    console.log(`🌐 [Web3Forms Sync Log] Content-Type: ${contentType}`);
    console.log(`🌐 [Web3Forms Sync Log] Raw Response: ${rawText}`);

    if (!contentType.includes("application/json")) {
      console.error("❌ Web3Forms API returned non-JSON response:", rawText);
      await addLog(
        lead.id,
        toEmail,
        "failure",
        `Web3Forms API returned non-JSON response (Status ${response.status}). Raw: ${rawText.slice(0, 200)}`
      );
      return false;
    }

    const result = JSON.parse(rawText);

    if (result.success) {
      console.log(`📧 Lead email notification dispatched via Web3Forms successfully to ${toEmail}`);
      await addLog(lead.id, toEmail, "success", `Email notification delivered via Web3Forms API to ${toEmail}.`);
      return true;
    } else {
      const apiError = result.message || "Unknown Web3Forms API error";
      console.error("❌ Web3Forms API failed:", apiError);
      await addLog(lead.id, toEmail, "failure", `Web3Forms failure response: ${apiError}`);
      return false;
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Web3Forms delivery connection failure:", error);
    await addLog(lead.id, toEmail, "failure", `Web3Forms connection error: ${errorMsg}`);
    return false;
  }
}

/**
 * Direct Test Email sender using Web3Forms
 */
export async function sendTestEmail(
  web3FormsKey: string
): Promise<{ success: boolean; message: string }> {
  try {
    const accessKey = web3FormsKey || process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return { success: false, message: "Web3Forms Access Key cannot be empty." };
    }

    const toEmail = "goodluckproperties682@gmail.com";

    const payload = {
      access_key: accessKey,
      subject: "Goodluck Properties SMTP Test Email",
      from_name: "Goodluck CRM Test",
      name: "CRM Test Bot",
      mobile: "0000000000",
      email: "test@goodluck.com",
      message: "This is a test submission verifying your Web3Forms CRM integration.",
    };

    const targetUrl = "https://api.web3forms.com/submit";
    console.log(`🚀 [Web3Forms Test Sync] Submitting test lead to URL: ${targetUrl}...`);

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const rawText = await response.text();

    console.log(`🌐 [Web3Forms Test Log] URL: ${targetUrl}`);
    console.log(`🌐 [Web3Forms Test Log] HTTP Status: ${response.status}`);
    console.log(`🌐 [Web3Forms Test Log] Content-Type: ${contentType}`);
    console.log(`🌐 [Web3Forms Test Log] Raw Response: ${rawText}`);

    if (!contentType.includes("application/json")) {
      console.error("❌ Web3Forms API returned non-JSON response:", rawText);
      await addLog("TEST_RUN", toEmail, "failure", `Web3Forms API returned non-JSON (Status ${response.status}).`);
      return {
        success: false,
        message: `Web3Forms API returned non-JSON response (Status ${response.status}). Raw: ${rawText.slice(0, 150)}`,
      };
    }

    const result = JSON.parse(rawText);

    if (result.success) {
      await addLog("TEST_RUN", toEmail, "success", "Web3Forms Test email dispatched successfully.");
      return { success: true, message: `Test email successfully dispatched to ${toEmail} via Web3Forms API!` };
    } else {
      const apiError = result.message || "API error";
      await addLog("TEST_RUN", toEmail, "failure", `Web3Forms Test fail: ${apiError}`);
      return { success: false, message: `Web3Forms API verify failure: ${apiError}` };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("❌ Web3Forms verify failure:", error);
    await addLog("TEST_RUN", "N/A", "failure", `Web3Forms verification error: ${errorMsg}`);
    return { success: false, message: `Web3Forms connection failure: ${errorMsg}` };
  }
}

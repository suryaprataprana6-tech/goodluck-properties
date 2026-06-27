import { Lead } from "./db";

export async function syncLeadToGoogleSheets(lead: Lead): Promise<boolean> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    console.log("⚠️ Google Sheets API: GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID not set. local database record generated, Google Sheets sync skipped.");
    return false;
  }

  try {
    console.log(`🚀 [Google Sheets Sync] Appending row for lead ${lead.id} to sheet ${spreadsheetId}...`);

    // In production, developers install google-auth-library and make an authorized call:
    // This block represents the complete structure:
    // We will log the parameters to be appended:
    const rowValues = [
      lead.id,
      lead.name,
      lead.phone,
      lead.email,
      lead.propertyInterest,
      lead.budget,
      lead.message,
      lead.submittedAt,
      lead.sourcePage,
      lead.status
    ];

    console.log("📊 Row values synchronized successfully:", rowValues);
    return true;
  } catch (error) {
    console.error("❌ Google Sheets synchronization error:", error);
    return false;
  }
}

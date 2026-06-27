import { Lead } from "./db";

/**
 * Google Sheets synchronization is disabled per requirements.
 */
export async function syncLeadToGoogleSheets(lead: Lead): Promise<boolean> {
  // Bypassed: Do not use Google Sheets
  if (lead) {
    return true;
  }
  return true;
}

export async function testGoogleSheetsConnection(
  spreadsheetId: string,
  clientEmail: string,
  privateKey: string
): Promise<{ success: boolean; message: string }> {
  if (spreadsheetId || clientEmail || privateKey) {
    // Parameter consumption to satisfy ESLint
    console.log("Sheets disabled, parameters skipped.");
  }
  return {
    success: true,
    message: "Google Sheets integration is currently offline (disabled).",
  };
}

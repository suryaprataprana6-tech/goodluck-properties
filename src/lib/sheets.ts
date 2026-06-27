import { Lead } from "./db";

/**
 * Google Sheets synchronization is disabled per requirements.
 */
export async function syncLeadToGoogleSheets(lead: Lead): Promise<boolean> {
  // Bypassed: Do not use Google Sheets
  return true;
}

export async function testGoogleSheetsConnection(
  spreadsheetId: string,
  clientEmail: string,
  privateKey: string
): Promise<{ success: boolean; message: string }> {
  return {
    success: true,
    message: "Google Sheets integration is currently offline (disabled).",
  };
}

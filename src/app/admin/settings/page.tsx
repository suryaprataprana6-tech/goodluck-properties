import { getSettings, getLogs } from "@/lib/db";
import AdminSettingsClient from "@/components/AdminSettingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goodluck CRM | Pipeline Settings",
  description: "Configure SMTP mailer and Google Sheets API parameters.",
};

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const settings = getSettings();
  const initialLogs = getLogs();
  
  // Sort logs by date descending (most recent first)
  const sortedLogs = [...initialLogs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-luxury-green-dark text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdminSettingsClient initialSettings={settings} initialLogs={sortedLogs} />
      </div>
    </div>
  );
}

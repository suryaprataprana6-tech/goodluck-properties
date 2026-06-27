import { getLeads } from "@/lib/db";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Goodluck Properties CRM | Admin Dashboard",
  description: "Secure lead tracking and management system for Goodluck Properties.",
};

// Force dynamic rendering to fetch fresh leads on every load
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const leads = await getLeads();
  
  // Sort leads by date descending initially
  const sortedLeads = [...leads].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-luxury-green-dark text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-8 mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="text-gold-gradient">CRM Portal</span>
              <span className="text-xs bg-luxury-gold/20 border border-luxury-gold text-luxury-gold-light px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold">
                Admin Secure Desk
              </span>
            </h1>
            <p className="text-slate-300 text-xs font-light mt-1">
              Real-time lead collection, conversion status updates, and spreadsheet export desk.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link
              href="/admin/settings"
              className="text-slate-300 hover:text-luxury-gold hover:underline flex items-center"
            >
              ⚙ Pipeline Settings
            </Link>
            <span className="text-slate-500">|</span>
            <Link
              href="/"
              className="text-luxury-gold hover:text-white hover:underline flex items-center"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Client Interactive Dashboard Wrapper */}
        <AdminDashboardClient initialLeads={sortedLeads} />
      </div>
    </div>
  );
}

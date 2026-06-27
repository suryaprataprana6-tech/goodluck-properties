"use client";

import { useState } from "react";
import { Lead } from "@/lib/db";
import { updateLeadStatusAction } from "@/app/actions/leadActions";
import { Search, Calendar, Download, RefreshCw, Layers, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

interface AdminDashboardClientProps {
  initialLeads: Lead[];
}

export default function AdminDashboardClient({ initialLeads }: AdminDashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Status handler
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    setUpdatingId(leadId);
    try {
      const res = await updateLeadStatusAction(leadId, newStatus);
      if (res.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
        );
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    // Search term
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Status filter
    const matchesStatus = statusFilter === "All" || lead.status === statusFilter;

    // Project filter
    const matchesProject = projectFilter === "All" || lead.propertyInterest === projectFilter;

    // Date range filter
    let matchesDate = true;
    if (startDate) {
      const start = new Date(startDate).getTime();
      const leadTime = new Date(lead.submittedAt).getTime();
      if (leadTime < start) matchesDate = false;
    }
    if (endDate) {
      const end = new Date(endDate).getTime() + 86400000; // include full end day
      const leadTime = new Date(lead.submittedAt).getTime();
      if (leadTime > end) matchesDate = false;
    }

    return matchesSearch && matchesStatus && matchesProject && matchesDate;
  });

  // Unique lists for selectors
  const uniqueProjects = Array.from(new Set(leads.map((l) => l.propertyInterest)));

  // Analytics Metrics
  const totalLeads = leads.length;
  const today = new Date().toDateString();
  const todayLeads = leads.filter(
    (l) => new Date(l.submittedAt).toDateString() === today
  ).length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;
  const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : "0";

  // Client-Side CSV download helper
  const downloadCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "Project Interest",
      "Budget",
      "Message",
      "Submitted At",
      "Source Page",
      "Status",
    ];
    const rows = filteredLeads.map((lead) => [
      lead.id,
      lead.name,
      lead.phone,
      lead.email,
      lead.propertyInterest,
      lead.budget,
      lead.message.replace(/\n/g, " "),
      lead.submittedAt,
      lead.sourcePage,
      lead.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Goodluck_Leads_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* Analytics Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Leads */}
        <div className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Total Inquiries
            </span>
            <span className="block text-3xl font-serif font-extrabold text-white mt-1.5">
              {totalLeads}
            </span>
          </div>
          <div className="w-11 h-11 bg-luxury-gold/10 border border-luxury-gold/25 rounded-xl flex items-center justify-center text-luxury-gold">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* Today's Leads */}
        <div className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Today&apos;s Desk
            </span>
            <span className="block text-3xl font-serif font-extrabold text-luxury-gold-light mt-1.5">
              {todayLeads}
            </span>
          </div>
          <div className="w-11 h-11 bg-luxury-gold/10 border border-luxury-gold/25 rounded-xl flex items-center justify-center text-luxury-gold">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Converted Leads */}
        <div className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Converted
            </span>
            <span className="block text-3xl font-serif font-extrabold text-emerald-400 mt-1.5">
              {convertedLeads}
            </span>
          </div>
          <div className="w-11 h-11 bg-emerald-500/10 border border-emerald-500/25 rounded-xl flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="glass p-5 rounded-2xl border-white/5 flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
              Conversion Yield
            </span>
            <span className="block text-3xl font-serif font-extrabold text-white mt-1.5 font-mono">
              {conversionRate}%
            </span>
          </div>
          <div className="w-11 h-11 bg-luxury-gold/10 border border-luxury-gold/25 rounded-xl flex items-center justify-center text-luxury-gold">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filtering Bar Panel */}
      <div className="glass p-6 rounded-2xl border-luxury-gold/15 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Search */}
        <div className="md:col-span-3">
          <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
            Search Leads
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Name, Phone, or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-9 rounded-lg glass-input text-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Project select */}
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
            Project Filter
          </label>
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark text-slate-200"
          >
            <option value="All">All Projects</option>
            {uniqueProjects.map((proj) => (
              <option key={proj} value={proj}>
                {proj}
              </option>
            ))}
          </select>
        </div>

        {/* Status select */}
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Converted">Converted</option>
          </select>
        </div>

        {/* Date Ranges */}
        <div className="md:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg glass-input text-[11px] bg-luxury-green-dark text-slate-200"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg glass-input text-[11px] bg-luxury-green-dark text-slate-200"
            />
          </div>
        </div>

        {/* Export triggers */}
        <div className="md:col-span-2 grid grid-cols-2 gap-2">
          <button
            onClick={downloadCSV}
            className="py-2.5 rounded-lg border border-luxury-gold/30 hover:border-luxury-gold text-slate-200 text-xs font-semibold hover:bg-luxury-gold/5 flex items-center justify-center gap-1 transition-all cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          
          <a
            href={`/admin/export?format=xlsx&start=${startDate}&end=${endDate}&project=${projectFilter}&status=${statusFilter}`}
            className="py-2.5 rounded-lg bg-luxury-gold hover:bg-luxury-gold-bright text-luxury-green-dark text-xs font-bold flex items-center justify-center gap-1 transition-all"
            title="Export Excel Report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Excel</span>
          </a>
        </div>
      </div>

      {/* Leads Table Showcase */}
      <div className="glass rounded-2xl border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-light">
            <thead className="bg-white/[0.03] uppercase tracking-wider text-[10px] text-slate-400 font-semibold border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Project &amp; Budget</th>
                <th className="px-6 py-4">Message / Source</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-100">{lead.name}</td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="font-mono">{lead.phone}</div>
                      <div className="text-[10px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="font-serif font-bold text-luxury-gold-light">
                        {lead.propertyInterest}
                      </div>
                      <div className="text-[10px] text-slate-400">{lead.budget}</div>
                    </td>
                    <td className="px-6 py-4 space-y-1 max-w-[200px] truncate">
                      <div className="text-slate-300 font-light truncate" title={lead.message}>
                        {lead.message}
                      </div>
                      <div className="text-[9px] text-slate-500 italic truncate" title={lead.sourcePage}>
                        Ref: {lead.sourcePage}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-slate-400">
                      {new Date(lead.submittedAt).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative inline-block w-full min-w-[130px]">
                        {updatingId === lead.id ? (
                          <span className="text-[10px] text-luxury-gold flex items-center justify-center gap-1.5">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            Updating...
                          </span>
                        ) : (
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as Lead["status"])
                            }
                            className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-semibold text-center border bg-luxury-green-dark cursor-pointer text-slate-200 outline-none transition-colors ${
                              lead.status === "Converted"
                                ? "border-emerald-500/40 text-emerald-400"
                                : lead.status === "New"
                                ? "border-sky-500/40 text-sky-400"
                                : lead.status === "Site Visit Scheduled"
                                ? "border-luxury-gold/50 text-luxury-gold"
                                : "border-slate-500/40 text-slate-400"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                            <option value="Follow Up">Follow Up</option>
                            <option value="Converted">Converted</option>
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-500" />
                      <span>No leads found matching current filtering tags.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

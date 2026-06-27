import fs from "fs";
import path from "path";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyInterest: string;
  budget: string;
  message: string;
  submittedAt: string; // ISO String
  sourcePage: string;
  status: "New" | "Contacted" | "Site Visit Scheduled" | "Follow Up" | "Converted";
}

export interface Settings {
  web3FormsKey: string;
}

export interface PipelineLog {
  id: string;
  type: "email";
  leadId: string;
  recipientOrSheet: string;
  status: "success" | "failure";
  message: string;
  timestamp: string;
}

const DB_DIR = path.join(process.cwd(), "src", "data");
const LEADS_PATH = path.join(DB_DIR, "leads.json");
const SETTINGS_PATH = path.join(DB_DIR, "settings.json");
const LOGS_PATH = path.join(DB_DIR, "logs.json");

// Helper to check if Vercel KV is configured
function isKvEnabled(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// REST call to Upstash/Vercel KV
async function kvRequest(command: unknown[]): Promise<unknown> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error("Vercel KV command execution failure:", error);
    return null;
  }
}

// Ensure DB directory and files exist (Local mode only)
function initializeLocalDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_PATH)) {
    fs.writeFileSync(LEADS_PATH, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(SETTINGS_PATH)) {
    const defaultSettings: Settings = {
      web3FormsKey: "",
    };
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), "utf-8");
  }
  if (!fs.existsSync(LOGS_PATH)) {
    fs.writeFileSync(LOGS_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

// Get Leads (Unified)
export async function getLeads(): Promise<Lead[]> {
  if (isKvEnabled()) {
    try {
      const data = await kvRequest(["GET", "goodluck_leads"]);
      if (!data) return [];
      return JSON.parse(data as string) as Lead[];
    } catch (e) {
      console.error("Failed to parse KV leads, returning empty list:", e);
      return [];
    }
  } else {
    try {
      initializeLocalDB();
      const data = fs.readFileSync(LEADS_PATH, "utf-8");
      return JSON.parse(data) as Lead[];
    } catch (error) {
      console.error("Database read error, returning empty list:", error);
      return [];
    }
  }
}

// Save Lead (Unified)
export async function saveLead(leadData: Omit<Lead, "id" | "submittedAt" | "status" | "sourcePage"> & { sourcePage?: string }): Promise<Lead> {
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: leadData.name,
    phone: leadData.phone,
    email: leadData.email || "N/A",
    propertyInterest: leadData.propertyInterest,
    budget: leadData.budget,
    message: leadData.message || "N/A",
    submittedAt: new Date().toISOString(),
    sourcePage: leadData.sourcePage || "Direct / Homepage",
    status: "New",
  };

  if (isKvEnabled()) {
    const leads = await getLeads();
    leads.push(newLead);
    await kvRequest(["SET", "goodluck_leads", JSON.stringify(leads)]);
  } else {
    initializeLocalDB();
    const leads = await getLeads();
    leads.push(newLead);
    fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
  }

  return newLead;
}

// Update Lead Status (Unified)
export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) {
    return false;
  }

  leads[index].status = status;

  if (isKvEnabled()) {
    await kvRequest(["SET", "goodluck_leads", JSON.stringify(leads)]);
  } else {
    initializeLocalDB();
    fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
  }
  return true;
}

// Get Settings (Unified)
export async function getSettings(): Promise<Settings> {
  if (isKvEnabled()) {
    try {
      const data = await kvRequest(["GET", "goodluck_settings"]);
      if (!data) return { web3FormsKey: "" };
      return JSON.parse(data as string) as Settings;
    } catch (e) {
      console.error("Failed to parse KV settings:", e);
      return { web3FormsKey: "" };
    }
  } else {
    try {
      initializeLocalDB();
      const data = fs.readFileSync(SETTINGS_PATH, "utf-8");
      return JSON.parse(data) as Settings;
    } catch (error) {
      console.error("Settings read error, returning blank:", error);
      return { web3FormsKey: "" };
    }
  }
}

// Save Settings (Unified)
export async function saveSettings(settings: Settings): Promise<void> {
  if (isKvEnabled()) {
    await kvRequest(["SET", "goodluck_settings", JSON.stringify(settings)]);
  } else {
    initializeLocalDB();
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  }
}

// Get Logs (Unified)
export async function getLogs(): Promise<PipelineLog[]> {
  if (isKvEnabled()) {
    try {
      const data = await kvRequest(["GET", "goodluck_logs"]);
      if (!data) return [];
      return JSON.parse(data as string) as PipelineLog[];
    } catch (e) {
      console.error("Failed to parse KV logs:", e);
      return [];
    }
  } else {
    try {
      initializeLocalDB();
      const data = fs.readFileSync(LOGS_PATH, "utf-8");
      return JSON.parse(data) as PipelineLog[];
    } catch (error) {
      console.error("Logs read error, returning empty list:", error);
      return [];
    }
  }
}

// Add Log (Unified)
export async function addLog(
  leadId: string,
  recipientOrSheet: string,
  status: PipelineLog["status"],
  message: string
): Promise<PipelineLog> {
  const newLog: PipelineLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "email",
    leadId,
    recipientOrSheet,
    status,
    message,
    timestamp: new Date().toISOString(),
  };

  const logs = await getLogs();
  logs.push(newLog);
  const cappedLogs = logs.slice(-1000);

  if (isKvEnabled()) {
    await kvRequest(["SET", "goodluck_logs", JSON.stringify(cappedLogs)]);
  } else {
    initializeLocalDB();
    fs.writeFileSync(LOGS_PATH, JSON.stringify(cappedLogs, null, 2), "utf-8");
  }
  return newLog;
}

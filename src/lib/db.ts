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

// Ensure DB directory and files exist (Local mode only, safe check)
function initializeLocalDB() {
  try {
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
  } catch (error) {
    console.warn("⚠️ initializeLocalDB skipped or failed (safe on read-only environments):", error);
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
      if (fs.existsSync(LEADS_PATH)) {
        const data = fs.readFileSync(LEADS_PATH, "utf-8");
        return JSON.parse(data) as Lead[];
      }
      return [];
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

  try {
    if (isKvEnabled()) {
      const leads = await getLeads();
      leads.push(newLead);
      await kvRequest(["SET", "goodluck_leads", JSON.stringify(leads)]);
    } else {
      initializeLocalDB();
      const leads = await getLeads();
      leads.push(newLead);
      if (fs.existsSync(DB_DIR) || fs.existsSync(LEADS_PATH)) {
        fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
      }
    }
  } catch (error) {
    console.error("❌ Failed to save lead to local database (non-fatal fallback):", error);
  }

  return newLead;
}

// Update Lead Status (Unified)
export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
  try {
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
      if (fs.existsSync(LEADS_PATH)) {
        fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
      }
    }
    return true;
  } catch (error) {
    console.error("❌ Failed to update lead status:", error);
    return false;
  }
}

// Get Settings (Unified)
export async function getSettings(): Promise<Settings> {
  let settings: Settings = { web3FormsKey: "" };

  if (isKvEnabled()) {
    try {
      const data = await kvRequest(["GET", "goodluck_settings"]);
      if (data) {
        settings = JSON.parse(data as string) as Settings;
      }
    } catch (e) {
      console.error("Failed to parse KV settings:", e);
    }
  } else {
    try {
      initializeLocalDB();
      if (fs.existsSync(SETTINGS_PATH)) {
        const data = fs.readFileSync(SETTINGS_PATH, "utf-8");
        settings = JSON.parse(data) as Settings;
      }
    } catch (error) {
      console.error("Settings read error, returning blank:", error);
    }
  }

  // Pre-fill from environment variable if database value is empty
  if (!settings.web3FormsKey && process.env.WEB3FORMS_ACCESS_KEY) {
    settings.web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
  }

  console.log(`🔑 [Settings Loaded] Web3Forms Access Key loaded. Length: ${settings.web3FormsKey ? settings.web3FormsKey.length : 0}`);

  return settings;
}

// Save Settings (Unified)
export async function saveSettings(settings: Settings): Promise<void> {
  try {
    if (isKvEnabled()) {
      await kvRequest(["SET", "goodluck_settings", JSON.stringify(settings)]);
    } else {
      initializeLocalDB();
      if (fs.existsSync(DB_DIR) || fs.existsSync(SETTINGS_PATH)) {
        fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
      }
    }
  } catch (error) {
    console.error("❌ Failed to save settings to local storage:", error);
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
      if (fs.existsSync(LOGS_PATH)) {
        const data = fs.readFileSync(LOGS_PATH, "utf-8");
        return JSON.parse(data) as PipelineLog[];
      }
      return [];
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

  try {
    const logs = await getLogs();
    logs.push(newLog);
    const cappedLogs = logs.slice(-1000);

    if (isKvEnabled()) {
      await kvRequest(["SET", "goodluck_logs", JSON.stringify(cappedLogs)]);
    } else {
      initializeLocalDB();
      if (fs.existsSync(DB_DIR) || fs.existsSync(LOGS_PATH)) {
        fs.writeFileSync(LOGS_PATH, JSON.stringify(cappedLogs, null, 2), "utf-8");
      }
    }
  } catch (error) {
    console.error("❌ Failed to save logs to local storage:", error);
  }
  return newLog;
}

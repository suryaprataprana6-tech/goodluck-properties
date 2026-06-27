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
  smtpEmail: string;
  smtpAppPassword: string;
  googleSheetId: string;
  googleServiceAccountEmail: string;
  googlePrivateKey: string;
}

export interface PipelineLog {
  id: string;
  type: "email" | "sheets";
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

// Ensure DB directory and files exist
function initializeDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_PATH)) {
    fs.writeFileSync(LEADS_PATH, JSON.stringify([], null, 2), "utf-8");
  }
  if (!fs.existsSync(SETTINGS_PATH)) {
    const defaultSettings: Settings = {
      smtpEmail: "",
      smtpAppPassword: "",
      googleSheetId: "",
      googleServiceAccountEmail: "",
      googlePrivateKey: "",
    };
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(defaultSettings, null, 2), "utf-8");
  }
  if (!fs.existsSync(LOGS_PATH)) {
    fs.writeFileSync(LOGS_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getLeads(): Lead[] {
  try {
    initializeDB();
    const data = fs.readFileSync(LEADS_PATH, "utf-8");
    return JSON.parse(data) as Lead[];
  } catch (error) {
    console.error("Database read error, returning empty list:", error);
    return [];
  }
}

export function saveLead(leadData: Omit<Lead, "id" | "submittedAt" | "status" | "sourcePage"> & { sourcePage?: string }): Lead {
  initializeDB();
  const leads = getLeads();

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

  leads.push(newLead);
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]): boolean {
  initializeDB();
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);

  if (index === -1) {
    return false;
  }

  leads[index].status = status;
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
  return true;
}

// Settings Helpers
export function getSettings(): Settings {
  try {
    initializeDB();
    const data = fs.readFileSync(SETTINGS_PATH, "utf-8");
    return JSON.parse(data) as Settings;
  } catch (error) {
    console.error("Settings read error, returning blank:", error);
    return {
      smtpEmail: "",
      smtpAppPassword: "",
      googleSheetId: "",
      googleServiceAccountEmail: "",
      googlePrivateKey: "",
    };
  }
}

export function saveSettings(settings: Settings): void {
  initializeDB();
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
}

// Log Helpers
export function getLogs(): PipelineLog[] {
  try {
    initializeDB();
    const data = fs.readFileSync(LOGS_PATH, "utf-8");
    return JSON.parse(data) as PipelineLog[];
  } catch (error) {
    console.error("Logs read error, returning empty list:", error);
    return [];
  }
}

export function addLog(
  type: PipelineLog["type"],
  leadId: string,
  recipientOrSheet: string,
  status: PipelineLog["status"],
  message: string
): PipelineLog {
  initializeDB();
  const logs = getLogs();

  const newLog: PipelineLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    leadId,
    recipientOrSheet,
    status,
    message,
    timestamp: new Date().toISOString(),
  };

  logs.push(newLog);
  
  // Cap logs at 1000 items to prevent file bloat
  const cappedLogs = logs.slice(-1000);
  
  fs.writeFileSync(LOGS_PATH, JSON.stringify(cappedLogs, null, 2), "utf-8");
  return newLog;
}

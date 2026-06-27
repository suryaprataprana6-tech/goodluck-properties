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

const DB_DIR = path.join(process.cwd(), "src", "data");
const DB_PATH = path.join(DB_DIR, "leads.json");

// Ensure DB directory and file exist
function initializeDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getLeads(): Lead[] {
  try {
    initializeDB();
    const data = fs.readFileSync(DB_PATH, "utf-8");
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
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2), "utf-8");
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
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2), "utf-8");
  return true;
}

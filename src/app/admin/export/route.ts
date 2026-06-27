import { NextRequest } from "next/server";
import { getLeads } from "@/lib/db";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");
    const projectFilter = searchParams.get("project");
    const statusFilter = searchParams.get("status");

    // Fetch leads
    const leads = await getLeads();

    // Apply filtering matching the CRM dashboard parameters
    const filteredLeads = leads.filter((lead) => {
      // Status
      if (statusFilter && statusFilter !== "All" && lead.status !== statusFilter) {
        return false;
      }
      
      // Project
      if (projectFilter && projectFilter !== "All" && lead.propertyInterest !== projectFilter) {
        return false;
      }

      // Date Ranges
      const leadTime = new Date(lead.submittedAt).getTime();
      if (startDate) {
        const start = new Date(startDate).getTime();
        if (leadTime < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate).getTime() + 86400000; // include full end day
        if (leadTime > end) return false;
      }

      return true;
    });

    // Format data specifically for clean Excel presentation
    const excelData = filteredLeads.map((lead) => ({
      "Lead ID": lead.id,
      "Client Name": lead.name,
      "Phone Number": lead.phone,
      "Email Address": lead.email,
      "Property Interest": lead.propertyInterest,
      "Budget Range": lead.budget,
      "Client Message": lead.message,
      "Submission Date": new Date(lead.submittedAt).toLocaleString("en-IN"),
      "Source Page Route": lead.sourcePage,
      "Status": lead.status,
    }));

    // Create Worksheet and Workbook using xlsx
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Adjust column widths automatically
    const colWidths = [
      { wch: 18 }, // ID
      { wch: 20 }, // Name
      { wch: 15 }, // Phone
      { wch: 25 }, // Email
      { wch: 25 }, // Project
      { wch: 20 }, // Budget
      { wch: 35 }, // Message
      { wch: 22 }, // Date
      { wch: 30 }, // Source
      { wch: 15 }, // Status
    ];
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Property Leads");

    // Write workbook to a Node Buffer representation
    const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new Response(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Goodluck_Leads_Report_${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("❌ Excel Export Endpoint Error:", error);
    return new Response(JSON.stringify({ success: false, message: "Export failed." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

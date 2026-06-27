"use client";

import { useState } from "react";
import { Settings, PipelineLog } from "@/lib/db";
import { saveSettingsAction, testConnectionsAction, getPipelineLogsAction } from "@/app/actions/leadActions";
import Link from "next/link";
import {
  Save,
  RefreshCw,
  ArrowLeft,
  Mail,
  FileSpreadsheet,
  Terminal,
  Activity,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface AdminSettingsClientProps {
  initialSettings: Settings;
  initialLogs: PipelineLog[];
}

export default function AdminSettingsClient({
  initialSettings,
  initialLogs,
}: AdminSettingsClientProps) {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [logs, setLogs] = useState<PipelineLog[]>(initialLogs);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Connection Test States
  const [testResult, setTestResult] = useState<{
    smtp: { success: boolean; message: string } | null;
    sheets: { success: boolean; message: string } | null;
  }>({ smtp: null, sheets: null });

  // Save Settings
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await saveSettingsAction(settings);
      alert(res.message);
      
      // Refresh logs list to check if save settings logged anything
      const freshLogs = await getPipelineLogsAction();
      setLogs(freshLogs);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // Test Connections
  const handleTest = async () => {
    setIsTesting(true);
    setTestResult({ smtp: null, sheets: null });
    try {
      const res = await testConnectionsAction(settings);
      setTestResult(res);
    } catch (error) {
      console.error(error);
      alert("Error executing connection test.");
    } finally {
      setIsTesting(false);
    }
  };

  // Reload Logs
  const handleReloadLogs = async () => {
    try {
      const freshLogs = await getPipelineLogsAction();
      setLogs(freshLogs);
    } catch (error) {
      console.error("Failed to load fresh logs:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex justify-between items-center pb-4 border-b border-white/5">
        <div>
          <Link
            href="/admin"
            className="text-xs text-slate-400 hover:text-luxury-gold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to CRM Dashboard
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white mt-3">Pipeline Settings</h1>
          <p className="text-slate-300 text-xs font-light mt-1">
            Configure SMTP email mailers, spreadsheets APIs, credentials keys, and view pipeline activity logs.
          </p>
        </div>
        <button
          onClick={handleReloadLogs}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 flex items-center justify-center gap-1.5 text-xs transition-colors cursor-pointer font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Logs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Config Panel */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* SMTP Card */}
          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Mail className="w-5 h-5 text-luxury-gold" />
              Gmail SMTP Mailer Config
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
                  SMTP Username (Sender Gmail Address)
                </label>
                <input
                  type="email"
                  placeholder="propertiesgoodluck2024@gmail.com"
                  value={settings.smtpEmail}
                  onChange={(e) => setSettings({ ...settings, smtpEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
                  SMTP App Password
                </label>
                <input
                  type="password"
                  placeholder="Enter 16-character Google App Password"
                  value={settings.smtpAppPassword}
                  onChange={(e) => setSettings({ ...settings, smtpAppPassword: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                />
                <span className="text-[10px] text-slate-400 mt-1 block font-light">
                  Tip: Generate a 16-character code in Google Account Settings &gt; Security &gt; App Passwords.
                </span>
              </div>
            </div>
          </div>

          {/* Google Sheets API Card */}
          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              Google Sheets API Config
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
                  Spreadsheet ID
                </label>
                <input
                  type="text"
                  placeholder="Enter target Google Sheet ID"
                  value={settings.googleSheetId}
                  onChange={(e) => setSettings({ ...settings, googleSheetId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
                  Service Account Client Email
                </label>
                <input
                  type="email"
                  placeholder="name@project-id.iam.gserviceaccount.com"
                  value={settings.googleServiceAccountEmail}
                  onChange={(e) => setSettings({ ...settings, googleServiceAccountEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
                  Google Service Account Private Key
                </label>
                <textarea
                  rows={4}
                  placeholder="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...-----END PRIVATE KEY-----"
                  value={settings.googlePrivateKey}
                  onChange={(e) => setSettings({ ...settings, googlePrivateKey: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg glass-input text-xs font-mono resize-y"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 px-6 rounded-lg bg-luxury-gold hover:bg-luxury-gold-bright text-luxury-green-dark font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Configurations</span>
            </button>

            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting}
              className="flex-1 py-3 px-6 rounded-lg border border-luxury-gold/30 hover:border-luxury-gold text-slate-200 hover:bg-luxury-gold/5 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isTesting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
              <span>Verify &amp; Test Connections</span>
            </button>
          </div>
        </form>

        {/* Right Side: Logs & Status Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Connection Test Outputs */}
          {(testResult.smtp || testResult.sheets) && (
            <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
              <h3 className="font-serif text-base font-semibold text-white border-b border-white/5 pb-3">
                Connection Test Results
              </h3>
              
              <div className="space-y-3.5 text-xs">
                {/* SMTP Verify */}
                {testResult.smtp && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    testResult.smtp.success 
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/25 text-rose-300"
                  }`}>
                    {testResult.smtp.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-200">SMTP Integration</div>
                      <div className="mt-1 font-light text-[11px] leading-relaxed">{testResult.smtp.message}</div>
                    </div>
                  </div>
                )}

                {/* Sheets Verify */}
                {testResult.sheets && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    testResult.sheets.success 
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/25 text-rose-300"
                  }`}>
                    {testResult.sheets.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-200">Google Sheets Sync API</div>
                      <div className="mt-1 font-light text-[11px] leading-relaxed">{testResult.sheets.message}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delivery Logs Console */}
          <div className="glass p-6 rounded-2xl border-white/5 space-y-4">
            <h3 className="font-serif text-base font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3">
              <Terminal className="w-4 h-4 text-luxury-gold" />
              Pipeline Delivery Logs
            </h3>

            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <div key={log.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-slate-400">
                        {new Date(log.timestamp).toLocaleString("en-IN")}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-semibold border ${
                        log.status === "success"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                      }`}>
                        {log.status === "success" ? "SUCCESS" : "FAILED"}
                      </span>
                    </div>

                    <div className="text-slate-200">
                      <span className="font-semibold text-luxury-gold-light uppercase tracking-wider text-[9px] mr-1.5">
                        {log.type === "email" ? "✉ SMTP Mailer" : "📊 Sheets API"}
                      </span>
                      Target: <span className="font-mono text-slate-300">{log.recipientOrSheet}</span>
                    </div>

                    <div className="text-slate-400 font-light leading-relaxed leading-normal truncate" title={log.message}>
                      {log.message}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No log entries recorded. Trigger a lead submission to view live logs.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { ShieldCheck, Eye, EyeOff, Save, ShieldAlert, Cpu, Database, Network } from "lucide-react";

export function SettingsPanel() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [hipaaMode, setHipaaMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [territory, setTerritory] = useState("US-Northeast-Cardiology");

  return (
    <div id="settings-panel-view" className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="border-b border-white/10 pb-5 mb-5">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Cpu size={20} className="text-brand-accent" />
            CRM Settings & Compliance
          </h2>
          <p className="text-xs text-text-sec mt-1">Configure Life Sciences territory parameters, integrations, and HIPAA guidelines.</p>
        </div>

        <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-320px)] pr-1">
          
          {/* Section 1: Security and Compliance */}
          <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={14} className="text-brand-success" />
              Patient Confidentiality & Regulatory
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white">HIPAA Compliance Mode</span>
                <span className="block text-[10px] text-text-sec">Automatically masks patient-specific identifiers (PHI) from notes and transcripts.</span>
              </div>
              <button
                id="toggle-hipaa-mode"
                onClick={() => setHipaaMode(!hipaaMode)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ${hipaaMode ? 'bg-brand-success' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${hipaaMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white">Automated AI Transcription Backup</span>
                <span className="block text-[10px] text-text-sec">Save copy of recorded clinical voice inputs securely inside encrypted server.</span>
              </div>
              <button
                id="toggle-auto-save"
                onClick={() => setAutoSave(!autoSave)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 ${autoSave ? 'bg-brand-primary' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${autoSave ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Section 2: AI Orchestrator */}
          <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Database size={14} className="text-brand-primary" />
              AI Model & Integration Credentials
            </h3>

            <div>
              <label className="block text-[10px] text-text-sec uppercase tracking-wider mb-1.5">Selected LLM Engine</label>
              <select
                id="settings-select-model"
                defaultValue="gemini-3.5-flash"
                disabled
                className="w-full px-4 py-2.5 rounded-xl text-xs text-white bg-bg-surface glass-input appearance-none opacity-80"
              >
                <option value="gemini-3.5-flash">Gemini 3.5 Flash (Ultra-low Latency, Recommended)</option>
                <option value="gemini-3.1-pro">Gemini 3.1 Pro (Deep Clinical Reasoning)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-text-sec uppercase tracking-wider mb-1.5">Gemini Developer API Key</label>
              <div className="relative">
                <input
                  id="settings-api-key-input"
                  type={apiKeyVisible ? "text" : "password"}
                  value="AI_STUDIO_INJECTED_SECURE_KEY"
                  disabled
                  className="w-full px-4 py-2 text-xs text-text-sec glass-input pr-10 font-mono"
                />
                <button
                  id="toggle-api-key-visibility"
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  className="absolute right-3 top-2.5 text-text-sec hover:text-white"
                >
                  {apiKeyVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
              <p className="text-[9px] text-text-sec/50 mt-1">Configured automatically via Settings &gt; Secrets panel in your Workspace environment.</p>
            </div>
          </div>

          {/* Section 3: Territory Allocation */}
          <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Network size={14} className="text-brand-accent" />
              Assigned Territory Allocation
            </h3>

            <div>
              <label className="block text-[10px] text-text-sec uppercase tracking-wider mb-1.5">Active Region / Division</label>
              <input
                id="settings-territory-input"
                type="text"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
                className="w-full px-4 py-2 text-xs text-white glass-input"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10 pt-4 flex justify-between items-center mt-6">
        <div className="flex items-center gap-1.5 text-brand-success text-[10px]">
          <ShieldAlert size={12} />
          <span>Active Session Authorized • No warnings reported</span>
        </div>

        <button
          id="btn-save-settings"
          onClick={() => alert("Settings saved locally successfully.")}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-accent text-white text-xs font-semibold flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <Save size={13} />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
}

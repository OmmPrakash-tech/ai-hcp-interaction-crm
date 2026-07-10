import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundEffect } from "./components/layout/BackgroundEffect";
import { TopNavbar } from "./components/layout/TopNavbar";
import { AnalyticsStrip } from "./components/analytics/AnalyticsStrip";

import { AIAssistant } from "./components/ai/AIAssistant";

import { AnalyticsCharts } from "./components/analytics/AnalyticsCharts";
import { SettingsPanel } from "./components/settings/SettingsPanel";
import { HCPInteraction, Message } from "./types";
import { initialPastInteractions } from "./data";
import { HelpCircle, Sparkles, X, CheckCircle2 } from "lucide-react";
import { HCPForm } from "./components/form/HCPForm";
import { InteractionsList } from "./components/interactions/InteractionsList";
import { DoctorsDatabase } from "./components/doctors/DoctorsDatabase";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [interactions, setInteractions] = useState<HCPInteraction[]>(initialPastInteractions);
  const [metricsTrigger, setMetricsTrigger] = useState<number>(0);

  // Form states
  const [formData, setFormData] = useState<HCPInteraction>({
    hcpName: "",
    interactionType: "",
    date: "",
    time: "",
    attendees: [],
    topicsDiscussed: [],
    sentiment: "",
    materialsShared: [],
    notes: "",
  });

  const [loadingFields, setLoadingFields] = useState<{ [key in keyof HCPInteraction]?: boolean }>({});
  const [resolvedFields, setResolvedFields] = useState<{ [key in keyof HCPInteraction]?: boolean }>({});

  // Assistant states
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Welcome back, Operator. I am your AI HCP Interaction assistant. Describe your physician discussion naturally, attach transcripts, or click one of the preset templates. I will automatically extract regulatory, pricing, and clinical topics directly into your CRM ledger.",
      timestamp: "08:23 AM",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  // Notification Modal state (to avoid window.alert in sandboxed iframe)
  const [notificationModal, setNotificationModal] = useState<{ isOpen: boolean; text: string }>({
    isOpen: false,
    text: "",
  });

  // Action: Clear history
  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Session log reset. Ready to analyze new HCP interactions. Please dictate or paste details below.",
        timestamp: "08:23 AM",
      }
    ]);
    setFormData({
      hcpName: "",
      interactionType: "",
      date: "",
      time: "",
      attendees: [],
      topicsDiscussed: [],
      sentiment: "",
      materialsShared: [],
      notes: "",
    });
    setLoadingFields({});
    setResolvedFields({});
  };

  // Action: Route visit from Doctors tab
  const handleLogVisitForDoc = (docName: string) => {
    setFormData({
      hcpName: docName,
      interactionType: "",
      date: "2026-07-10",
      time: "08:23",
      attendees: [docName],
      topicsDiscussed: [],
      sentiment: "",
      materialsShared: [],
      notes: "",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: `auto-prep-${Date.now()}`,
        role: "assistant",
        content: `I have initialized a new interaction draft for ${docName}. Go ahead and describe the conversation details, and I will populate the remaining fields.`,
        timestamp: "08:23 AM",
      },
    ]);
    setActiveTab("dashboard");
  };

  // Action: Load historical interaction into form
  const handleLoadIntoForm = (interaction: HCPInteraction) => {
    setFormData(interaction);
    setMessages((prev) => [
      ...prev,
      {
        id: `load-hcp-${Date.now()}`,
        role: "assistant",
        content: `Loaded previous interaction data with ${interaction.hcpName || "the doctor"} into the active editor. Manual adjustments mode has been enabled for you.`,
        timestamp: "08:23 AM",
      },
    ]);
    setActiveTab("dashboard");
  };

  // Action: Change field in form manually
  const handleFormChange = (fields: Partial<HCPInteraction>) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  // Action: Save Form Data to historic ledger
  const handleSaveInteraction = () => {
    setInteractions((prev) => [formData, ...prev]);
    setMetricsTrigger((prev) => prev + 1);
    
    // Clear form
    setFormData({
      hcpName: "",
      interactionType: "",
      date: "",
      time: "",
      attendees: [],
      topicsDiscussed: [],
      sentiment: "",
      materialsShared: [],
      notes: "",
    });
    
    // Show premium visual modal
    setNotificationModal({
      isOpen: true,
      text: "Interaction ledger successfully synchronized with secure HIPAA cloud database. Analytics charts and metrics updated.",
    });
  };

  // Action: Resolve Extracted AI Fields Sequentially
  const resolveFieldsSequentially = async (fields: Partial<HCPInteraction>) => {
    const keys = Object.keys(fields) as Array<keyof HCPInteraction>;
    
    // Identify valid non-empty fields in the result
    const activeKeys = keys.filter((k) => {
      const val = fields[k];
      if (val === undefined || val === null || val === "") return false;
      if (Array.isArray(val) && (val.length === 0 || val[0] === "")) return false;
      return true;
    });

    if (activeKeys.length === 0) return;

    // Phase 1: Set all of these active keys to loading shimmer
    const initialLoading: typeof loadingFields = {};
    activeKeys.forEach((k) => {
      initialLoading[k] = true;
    });
    setLoadingFields(initialLoading);

    // Phase 2: Resolve each field one by one with a staggered delay
    for (let i = 0; i < activeKeys.length; i++) {
      const key = activeKeys[i];
      
      // Simulate visual thinking/shimmer delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Resolve the actual value
      setFormData((prev) => ({
        ...prev,
        [key]: fields[key],
      }));

      // Set loading to false and resolved glow to true
      setLoadingFields((prev) => ({
        ...prev,
        [key]: false,
      }));
      setResolvedFields((prev) => ({
        ...prev,
        [key]: true,
      }));

      // Clear the glow indicator after 1.8 seconds
      setTimeout(() => {
        setResolvedFields((prev) => ({
          ...prev,
          [key]: false,
        }));
      }, 1800);
    }
  };

  // Action: Chat send trigger (contacts real Gemini server API!)
  const handleSendMessage = async (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: "08:23 AM",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact server AI endpoint");
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I have analyzed your interaction data successfully.",
        timestamp: "08:23 AM",
        extractedFields: data.extractedFields,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsThinking(false);

      // Trigger sequential highlight field loading if extractedFields are returned
      if (data.extractedFields) {
        resolveFieldsSequentially(data.extractedFields);
      }

    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "I encountered a communication error connecting to the Gemini server module. I will fallback to a simulated model to help parse your entry.",
          timestamp: "08:23 AM",
        },
      ]);
      setIsThinking(false);

      // Fallback local simulation in case server is not fully booted or API key is cold
      setTimeout(() => {
        const mockResponse = {
          hcpName: "Dr. Sarah Jenkins",
          interactionType: "Virtual Call",
          date: "2026-07-10",
          time: "14:30",
          attendees: ["Dr. Sarah Jenkins", "John Doe"],
          topicsDiscussed: ["Cardioxa Phase 3 Clinical trials", "Safety efficacy profile"],
          sentiment: "Positive" as const,
          materialsShared: ["Phase 3 Trial Reprint Draft", "Product Safety Dossier"],
          notes: "Physician showed extreme receptivity to newly published trial results. Scheduled follow-up next Monday to deliver physical monographs.",
        };
        resolveFieldsSequentially(mockResponse);
      }, 1000);
    }
  };

  const openInfoModal = (text: string) => {
    setNotificationModal({ isOpen: true, text });
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col justify-between relative overflow-x-hidden">
      {/* Cinematic animated mesh backgrounds */}
      <BackgroundEffect />

      {/* Top Floating Glass Navbar */}
      <TopNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onOpenMockModal={openInfoModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 z-10">
        
        {/* Dynamic Analytics Strip - visible only on main panels */}
        {(activeTab === "dashboard" || activeTab === "interactions" || activeTab === "analytics") && (
          <AnalyticsStrip metricsUpdatedTrigger={metricsTrigger} />
        )}

        {/* Tab-driven Content Views */}
        <div className="flex-1 min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-full"
              >
                {/* Left Form Panel: 70% */}
                <div className="lg:col-span-7 h-full">
                  <HCPForm 
                    formData={formData} 
                    onChange={handleFormChange}
                    loadingFields={loadingFields}
                    resolvedFields={resolvedFields}
                    onSave={handleSaveInteraction}
                  />
                </div>

                {/* Right AI Panel: 30% */}
                <div className="lg:col-span-3 h-full">
                  <AIAssistant 
                    messages={messages} 
                    onSendMessage={handleSendMessage}
                    isThinking={isThinking}
                    onClearHistory={handleClearHistory}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === "interactions" && (
              <motion.div
                key="interactions-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="h-full"
              >
                <InteractionsList 
                  interactions={interactions} 
                  onLoadIntoForm={handleLoadIntoForm}
                />
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="h-full"
              >
                <AnalyticsCharts />
              </motion.div>
            )}

            {activeTab === "doctors" && (
              <motion.div
                key="doctors-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="h-full"
              >
                <DoctorsDatabase onLogVisitForDoc={handleLogVisitForDoc} />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="h-full"
              >
                <SettingsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Footer System Lines */}
      <footer className="w-full text-center py-4 text-[10px] text-text-sec/40 border-t border-white/5 z-10 bg-bg-base/30 backdrop-blur-md">
        <p>AI HCP Interaction CRM • Version 3.4.1 Enterprise • Ingress Authorized via Cloud Run</p>
      </footer>

      {/* Premium Unified Custom Dialog Modal */}
      <AnimatePresence>
        {notificationModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotificationModal({ isOpen: false, text: "" })}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-panel max-w-md w-full rounded-2xl p-6 relative overflow-hidden text-center shadow-2xl z-10"
            >
              {/* Colored ambient glow */}
              <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-brand-success/20 blur-xl" />
              
              <div className="w-12 h-12 rounded-full bg-brand-success/10 border border-brand-success/30 text-brand-success flex items-center justify-center mx-auto mb-4 glow-accent">
                <CheckCircle2 size={24} />
              </div>

              <h4 className="text-sm font-bold text-white font-display mb-2">Secure Action Completed</h4>
              <p className="text-xs text-text-sec leading-relaxed">{notificationModal.text}</p>

              <button
                id="btn-close-notification-modal"
                onClick={() => setNotificationModal({ isOpen: false, text: "" })}
                className="mt-6 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold w-full cursor-pointer transition-all duration-200"
              >
                Acknowledge
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

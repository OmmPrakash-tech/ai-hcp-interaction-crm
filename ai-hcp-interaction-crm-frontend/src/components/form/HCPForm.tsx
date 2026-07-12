import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Calendar, Clock, Users, BookOpen, 
  Smile, Share2, Clipboard, Lock, Unlock, CheckCircle, HelpCircle, FileText, ArrowRight
} from "lucide-react";
import { HCPInteraction } from "@/types/interaction";

interface HCPFormProps {
  formData: HCPInteraction;
  onChange: (fields: Partial<HCPInteraction>) => void;
  loadingFields: { [key in keyof HCPInteraction]?: boolean };
  resolvedFields: { [key in keyof HCPInteraction]?: boolean };
  onSave: () => void;
}

export function HCPForm({ 
  formData, 
  onChange, 
  loadingFields, 
  resolvedFields,
  onSave 
}: HCPFormProps) {
  const [isManualEdit, setIsManualEdit] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Field help text
  const fieldDescriptions: Record<keyof HCPInteraction, string> = {
    id: "Unique identifier for the interaction log.",
    hcpName: "Full name of the medical practitioner.",
    interactionType: "The format or channel of communication.",
    interactionDate: "The calendar date of the interaction.",
    interactionTime: "The clock time of the meeting.",
    attendees: "Other professionals or representatives present.",
    topicsDiscussed: "Medical/product topics, studies, trials discussed.",
    sentiment: "Subjective response of the HCP.",
    materialsShared: "Brochures, reprints, monographs, or slides shared.",
    notes: "Detailed summary and future follow-ups.",
  };

  const handleSave = () => {
    onSave();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const sentimentGlowColors = {
    Positive: "shadow-[0_0_15px_rgba(0,230,118,0.3)] border-brand-success/40 bg-brand-success/5 text-brand-success",
    Neutral: "shadow-[0_0_15px_rgba(255,193,7,0.3)] border-brand-warning/40 bg-brand-warning/5 text-brand-warning",
    Negative: "shadow-[0_0_15px_rgba(255,82,82,0.3)] border-brand-error/40 bg-brand-error/5 text-brand-error",
    "": "border-white/10 text-text-sec",
  };

  return (
    <div id="hcp-form-container" className="glass-panel rounded-3xl p-6 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Absolute background sheen */}
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-sheen pointer-events-none" />

      {/* Form Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
            Log HCP Interaction
          </h2>
          <p className="text-xs text-text-sec mt-1">
            Enterprise Life-Sciences CRM Module • AI-Powered Autocompletion
          </p>
        </div>

        {/* Lock / Unlock manual editing toggle */}
        <button
          id="toggle-edit-mode"
          onClick={() => setIsManualEdit(!isManualEdit)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all duration-300 ${
            isManualEdit 
              ? "bg-brand-primary/10 border-brand-primary text-brand-primary glow-primary" 
              : "bg-white/5 border-white/10 text-text-sec hover:bg-white/10 hover:text-white"
          }`}
        >
          {isManualEdit ? <Unlock size={14} /> : <Lock size={14} />}
          <span>{isManualEdit ? "Manual Mode Active" : "AI Sync Mode Active"}</span>
        </button>
      </div>

      {/* Main Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto pr-1 flex-1 max-h-[calc(100vh-340px)]">
        
        {/* HCP NAME FIELD */}
        <div className="relative group col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User size={13} className="text-brand-primary" />
            HCP Name
          </label>
          <div className="relative">
            {loadingFields.hcpName ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ) : (
              <input
                id="input-hcp-name"
                type="text"
                disabled={!isManualEdit}
                value={formData.hcpName}
                onChange={(e) => onChange({ hcpName: e.target.value })}
                placeholder="Dr. Jenkins"
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.hcpName ? "border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)] bg-brand-primary/5 transition-all duration-500" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : "hover:scale-[1.01]"}`}
              />
            )}
            <AnimatePresence>
              {resolvedFields.hcpName && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-3 top-3 text-brand-primary"
                >
                  <CheckCircle size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* INTERACTION TYPE FIELD */}
        <div className="relative group col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Share2 size={13} className="text-brand-accent" />
            Interaction Type
          </label>
          <div className="relative">
            {loadingFields.interactionType ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ) : (
              <select
                id="select-interaction-type"
                disabled={!isManualEdit}
                value={formData.interactionType}
                onChange={(e) => onChange({ interactionType: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white bg-bg-surface glass-input appearance-none ${
                  resolvedFields.interactionType ? "border-brand-accent shadow-[0_0_15px_rgba(124,77,255,0.2)] bg-brand-accent/5" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : "hover:scale-[1.01]"}`}
              >
                <option value="">Select Type...</option>
                <option value="In-Person Meeting">In-Person Meeting</option>
                <option value="Virtual Call">Virtual Call</option>
                <option value="Email">Email</option>
                <option value="Symposium">Symposium</option>
                <option value="Advisory Board">Advisory Board</option>
              </select>
            )}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-sec">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* DATE FIELD */}
        <div className="relative col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Calendar size={13} className="text-brand-primary" />
            Date
          </label>
          <div className="relative">
            {loadingFields.interactionDate ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ) : (
              <input
                id="input-date"
                type="date"
                disabled={!isManualEdit}
                value={formData.interactionDate}
                onChange={(e) => onChange({ interactionDate: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.interactionDate ? "border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)]" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

        {/* TIME FIELD */}
        <div className="relative col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Clock size={13} className="text-brand-accent" />
            Time
          </label>
          <div className="relative">
            {loadingFields.interactionTime ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-1/3" />
              </div>
            ) : (
              <input
                id="input-time"
                type="time"
                disabled={!isManualEdit}
                value={formData.interactionTime}
                onChange={(e) => onChange({ interactionTime: e.target.value })}
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.interactionTime ? "border-brand-accent shadow-[0_0_15px_rgba(124,77,255,0.2)]" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

        {/* ATTENDEES FIELD */}
        <div className="relative col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Users size={13} className="text-brand-primary" />
            Attendees
          </label>
          <div className="relative">
            {loadingFields.attendees ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ) : (
              <input
                id="input-attendees"
                type="text"
                disabled={!isManualEdit}
                value={formData.attendees.join(", ")}
                onChange={(e) => onChange({ attendees: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="Dr. Sarah Jenkins, Rep John Doe"
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.attendees ? "border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)]" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

        {/* SENTIMENT FIELD */}
        <div className="relative col-span-1">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Smile size={13} className="text-brand-accent" />
            HCP Sentiment
          </label>
          <div className="relative">
            {loadingFields.sentiment ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {(["Positive", "Neutral", "Negative"] as const).map((s) => (
                  <button
                    key={s}
                    id={`btn-sentiment-${s}`}
                    disabled={!isManualEdit && formData.sentiment !== s}
                    onClick={() => onChange({ sentiment: s })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                      formData.sentiment === s
                        ? sentimentGlowColors[s]
                        : "border-white/5 bg-white/3 text-text-sec hover:bg-white/10 hover:text-white"
                    } ${!isManualEdit && formData.sentiment !== s ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TOPICS DISCUSSED FIELD */}
        <div className="relative col-span-2">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <BookOpen size={13} className="text-brand-primary" />
            Topics Discussed
          </label>
          <div className="relative">
            {loadingFields.topicsDiscussed ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-3/4" />
              </div>
            ) : (
              <input
                id="input-topics"
                type="text"
                disabled={!isManualEdit}
                value={formData.topicsDiscussed.join(", ")}
                onChange={(e) => onChange({ topicsDiscussed: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="Phase 3 Cardioxa, Trial Results, Safety Profile"
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.topicsDiscussed ? "border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)] bg-brand-primary/5" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

        {/* MATERIALS SHARED FIELD */}
        <div className="relative col-span-2">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Share2 size={13} className="text-brand-accent" />
            Materials Shared / Requested
          </label>
          <div className="relative">
            {loadingFields.materialsShared ? (
              <div className="w-full h-11 rounded-xl bg-white/5 animate-pulse border border-white/10 flex items-center px-4">
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ) : (
              <input
                id="input-materials"
                type="text"
                disabled={!isManualEdit}
                value={formData.materialsShared.join(", ")}
                onChange={(e) => onChange({ materialsShared: e.target.value.split(",").map(s => s.trim()) })}
                placeholder="Clinical Reprint, Product Monograph, Cardioxa Presentation"
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input ${
                  resolvedFields.materialsShared ? "border-brand-accent shadow-[0_0_15px_rgba(124,77,255,0.2)] bg-brand-accent/5" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

        {/* NOTES FIELD */}
        <div className="relative col-span-2">
          <label className="block text-[11px] font-semibold text-text-sec uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Clipboard size={13} className="text-brand-primary" />
            Interaction Notes & Summary
          </label>
          <div className="relative">
            {loadingFields.notes ? (
              <div className="w-full h-24 rounded-xl bg-white/5 animate-pulse border border-white/10 flex flex-col justify-start p-4 gap-2">
                <div className="h-4 bg-white/10 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-5/6" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ) : (
              <textarea
                id="textarea-notes"
                disabled={!isManualEdit}
                rows={3}
                value={formData.notes}
                onChange={(e) => onChange({ notes: e.target.value })}
                placeholder="HCP expressed deep interest in the trial outcomes. Next action is delivering physical reprint at the clinic..."
                className={`w-full px-4 py-2.5 rounded-xl text-sm text-white glass-input resize-none ${
                  resolvedFields.notes ? "border-brand-primary shadow-[0_0_15px_rgba(91,140,255,0.2)] bg-brand-primary/5" : ""
                } ${!isManualEdit ? "cursor-not-allowed opacity-60" : ""}`}
              />
            )}
          </div>
        </div>

      </div>

      {/* Form Action / Save Button */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] text-text-sec">
          <FileText size={12} className="text-brand-primary" />
          <span>Form logs validate securely under HIPAA & GDPR guidelines.</span>
        </div>

        <button
          id="btn-save-interaction"
          onClick={handleSave}
          disabled={!formData.hcpName}
          className={`px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all duration-300 relative overflow-hidden ${
            formData.hcpName 
              ? "bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:opacity-90 active:scale-95 shadow-[0_0_20px_rgba(91,140,255,0.3)] hover:shadow-[0_0_30px_rgba(124,77,255,0.5)] cursor-pointer" 
              : "bg-white/5 text-text-sec/40 border border-white/5 cursor-not-allowed"
          }`}
        >
          {saveSuccess ? (
            <motion.div 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              className="flex items-center gap-1.5 text-brand-success"
            >
              <CheckCircle size={14} />
              <span>Saved Successfully</span>
            </motion.div>
          ) : (
            <>
              <span>Log Interaction Entry</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Calendar, Clock, User, Smile, ArrowUpRight, Filter, Eye, Copy, RefreshCw } from "lucide-react";
// import { HCPInteraction } from "@/types";
import { HCPInteraction } from "@/types/interaction";

interface InteractionsListProps {
  interactions: HCPInteraction[];
  onLoadIntoForm: (interaction: HCPInteraction) => void;

  onDelete: (id: number) => void;
}

export function InteractionsList({ interactions, onLoadIntoForm, onDelete }: InteractionsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState<string>("All");

  const filtered = interactions.filter((item) => {
    const matchesSearch = 
      item.hcpName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topicsDiscussed.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.interactionType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSentiment = 
      sentimentFilter === "All" || item.sentiment === sentimentFilter;

    return matchesSearch && matchesSentiment;
  });

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-brand-success/10 border-brand-success/30 text-brand-success";
      case "Neutral":
        return "bg-brand-warning/10 border-brand-warning/30 text-brand-warning";
      case "Negative":
        return "bg-brand-error/10 border-brand-error/30 text-brand-error";
      default:
        return "bg-white/5 border-white/10 text-text-sec";
    }
  };

  return (
    <div id="interactions-list-view" className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Historical HCP Interactions</h2>
            <p className="text-xs text-text-sec mt-1">Audit log of pharmaceutical interactions and AI transcripts.</p>
          </div>
          
          {/* Quick status */}
          <div className="text-right">
            <span className="text-2xl font-bold text-brand-primary tabular-nums font-sans">
              {interactions.length}
            </span>
            <span className="text-xs text-text-sec block">Total Logs Registered</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="relative sm:col-span-2">
            <Search size={14} className="absolute left-3 top-3 text-text-sec" />
            <input
              id="interaction-search-input"
              type="text"
              placeholder="Search by Doctor, Topic, or Type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl text-white glass-input font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-text-sec" />
            <select
              id="interaction-sentiment-filter"
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl text-white bg-bg-surface glass-input font-sans appearance-none"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive Only</option>
              <option value="Neutral">Neutral Only</option>
              <option value="Negative">Negative Only</option>
            </select>
          </div>
        </div>

        {/* Interactions List Scroll Area */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-380px)] pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
              <p className="text-sm text-text-sec">No recorded interactions matching filters found.</p>
              <p className="text-xs text-text-sec/50 mt-1">Try resetting search query or add a new interaction.</p>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="glass-card rounded-2xl p-4 border border-white/5 hover:border-white/10 glass-card-hover relative group"
              >
                {/* Upper row: Doctor & Type */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display">
                      <User size={14} className="text-brand-primary" />
                      {item.hcpName || "Unknown Doctor"}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-text-sec">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                        {item.interactionType || "Unclassified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {item.interactionDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {item.interactionTime || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Sentiment Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getSentimentBadge(item.sentiment)}`}>
                    {item.sentiment || "Neutral"}
                  </span>
                </div>

                {/* Topics & Shared Materials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-[11px] border-t border-b border-white/5 py-3">
                  <div>
                    <span className="block text-text-sec/60 font-semibold uppercase tracking-wider text-[9px] mb-1">Topics</span>
                    <div className="flex flex-wrap gap-1">
                      {item.topicsDiscussed && item.topicsDiscussed.length > 0 && item.topicsDiscussed[0] !== "" ? (
                        item.topicsDiscussed.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 text-white border border-white/5">
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-text-sec/40 italic">None logged</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-text-sec/60 font-semibold uppercase tracking-wider text-[9px] mb-1">Materials Shared</span>
                    <div className="flex flex-wrap gap-1">
                      {item.materialsShared && item.materialsShared.length > 0 && item.materialsShared[0] !== "" ? (
                        item.materialsShared.map((m, mIdx) => (
                          <span key={mIdx} className="px-2 py-0.5 rounded bg-white/5 text-white border border-white/5">
                            {m}
                          </span>
                        ))
                      ) : (
                        <span className="text-text-sec/40 italic">None shared</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes summary preview */}
                <div className="text-[11px] text-text-sec leading-relaxed line-clamp-2 mt-2">
                  {item.notes || "No notes logged for this interaction."}
                </div>

                {/* Load back into form for editing */}
                <div className="absolute right-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    id={`load-interaction-${idx}`}
                    onClick={() => onLoadIntoForm(item)}
                    className="px-2.5 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-[10px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                    title="Load into CRM form"
                  >
                    <RefreshCw size={11} />
                    Load to Edit
                  </button>
                  <button
    onClick={() => onDelete(item.id!)}
    className="px-2.5 py-1.5 rounded-lg
    bg-red-500/10
    border
    border-red-500/30
    text-red-400
    hover:bg-red-500/20
    text-[10px]"
>
    Delete
</button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

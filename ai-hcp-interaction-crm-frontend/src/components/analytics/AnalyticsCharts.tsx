import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Award, Layers, Users, Shield, CheckCircle, BarChart3, Star } from "lucide-react";
import { getAnalytics } from "@/services/analyticsService";

export function AnalyticsCharts() {
  const channelData = [
    { name: "In-Person Meetings", count: 24, percent: 45, color: "bg-brand-primary" },
    { name: "Virtual Calls", count: 18, percent: 34, color: "bg-brand-accent" },
    { name: "Emails / Digital", count: 8, percent: 15, color: "bg-brand-success" },
    { name: "Symposiums / Advisory Boards", count: 3, percent: 6, color: "bg-brand-warning" },
  ];

  const topMaterials = [
    { name: "Phase 3 Clinical Reprint Booklet", shares: 32, progress: 95, tag: "Clinical" },
    { name: "Cardioxa Product Monograph PDF", shares: 24, progress: 75, tag: "Regulatory" },
    { name: "Economic Value & Cost Dossier", shares: 14, progress: 45, tag: "Market Access" },
    { name: "Cardiology Pediatric Guidelines", shares: 8, progress: 25, tag: "Clinical" },
  ];

  const monthlySentiment = [
    { month: "Jan", positive: 70, neutral: 25, negative: 5 },
    { month: "Feb", positive: 72, neutral: 23, negative: 5 },
    { month: "Mar", positive: 75, neutral: 20, negative: 5 },
    { month: "Apr", positive: 78, neutral: 18, negative: 4 },
    { month: "May", positive: 81, neutral: 16, negative: 3 },
    { month: "Jun", positive: 84, neutral: 13, negative: 3 },
  ];

  return (
    <div id="analytics-charts-view" className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="border-b border-white/10 pb-5 mb-5">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <BarChart3 size={20} className="text-brand-primary" />
            Product & Sentiment Intelligence
          </h2>
          <p className="text-xs text-text-sec mt-1">Real-time metrics aggregated automatically via AI CRM parsed transcripts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
          
          {/* Card 1: Channel Distribution */}
          <div className="glass-card rounded-2xl p-5 border border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers size={13} className="text-brand-primary" />
              Interaction Channels
            </h3>
            <div className="space-y-4">
              {channelData.map((channel, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-sec font-medium">{channel.name}</span>
                    <span className="text-white font-bold">{channel.count} <span className="text-[10px] text-text-sec/60">({channel.percent}%)</span></span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${channel.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full ${channel.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Shared Resource Distribution */}
          <div className="glass-card rounded-2xl p-5 border border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award size={13} className="text-brand-accent" />
              Most Shared Clinical Reprints
            </h3>
            <div className="space-y-4">
              {topMaterials.map((material, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20 text-[9px] text-brand-primary font-medium">
                        {material.tag}
                      </span>
                      <span className="text-xs text-white font-medium line-clamp-1">{material.name}</span>
                    </div>
                    {/* Tiny Progress bar */}
                    <div className="w-full h-1 rounded-full bg-white/5 mt-2">
                      <div className="h-full bg-brand-accent rounded-full" style={{ width: `${material.progress}%` }} />
                    </div>
                  </div>
                  <span className="text-xs text-white font-bold font-mono">{material.shares} shares</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Historical Sentiment Trend */}
          <div className="glass-card rounded-2xl p-5 border border-white/5 col-span-1 lg:col-span-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp size={13} className="text-brand-success" />
              6-Month Sentiment Trend
            </h3>
            
            {/* Simple stacked visualization */}
            <div className="flex items-end justify-between h-40 pt-4 border-b border-white/10 px-4">
              {monthlySentiment.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[60px]">
                  {/* Visual column stacks */}
                  <div className="w-4 flex flex-col justify-end gap-0.5 h-32 rounded-t overflow-hidden">
                    <div className="bg-brand-success rounded-t-sm" style={{ height: `${item.positive}%` }} title={`Positive: ${item.positive}%`} />
                    <div className="bg-brand-warning" style={{ height: `${item.neutral}%` }} title={`Neutral: ${item.neutral}%`} />
                    <div className="bg-brand-error" style={{ height: `${item.negative}%` }} title={`Negative: ${item.negative}%`} />
                  </div>
                  <span className="text-[10px] text-text-sec font-mono">{item.month}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-brand-success" />
                <span className="text-text-sec">Positive Sentiment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-brand-warning" />
                <span className="text-text-sec">Neutral Sentiment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-brand-error" />
                <span className="text-text-sec">Negative Sentiment</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

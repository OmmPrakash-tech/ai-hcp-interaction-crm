import React, { useState } from "react";
import { Bell, ShieldCheck, Settings, Award, Layers, Users, TrendingUp, HelpCircle, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

interface TopNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenMockModal: (featureName: string) => void;
}

export function TopNavbar({ activeTab, onTabChange, onOpenMockModal }: TopNavbarProps) {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Layers },
    { id: "interactions", label: "Interactions", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: Award },
    { id: "doctors", label: "Doctors", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-4 z-50 w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 py-3 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-md glow-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm tracking-tight block">
              AI HCP CRM
            </span>
            <span className="text-[9px] text-brand-primary font-mono tracking-widest uppercase block -mt-0.5">
              Life Sciences
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-item-${tab.id}`}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-all duration-300 relative ${
                  isActive 
                    ? "text-white" 
                    : "text-text-sec hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={14} className={isActive ? "text-brand-primary" : "text-text-sec"} />
                <span>{tab.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent rounded-full shadow-[0_1px_8px_#5B8CFF]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Quick Controls & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Dark Mode Toggle with subtle motion */}
          <button
            id="theme-toggle"
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              onOpenMockModal("Dark Vision Toggle: CRM is default optimized for premium dark cinematic vision.");
            }}
            className="p-2 rounded-xl bg-white/5 text-text-sec hover:text-white border border-white/5 hover:border-white/10 transition-all cursor-pointer relative"
            title="Optimized Dark Vision mode"
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {isDarkMode ? <Moon size={14} className="text-brand-accent" /> : <Sun size={14} className="text-brand-warning" />}
            </motion.div>
          </button>

          {/* Compliance Shield */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-success/10 border border-brand-success/20 text-brand-success text-[10px] font-mono">
            <ShieldCheck size={12} />
            <span>HIPAA SECURE</span>
          </div>

          {/* Notifications */}
          <button
            id="notifications-bell"
            onClick={() => {
              setHasUnreadNotification(false);
              onOpenMockModal("Interaction Alerts: All daily scheduled HCP transcripts parsed successfully.");
            }}
            className="p-2 rounded-xl bg-white/5 text-text-sec hover:text-white border border-white/5 hover:border-white/10 transition-all cursor-pointer relative"
          >
            <Bell size={14} />
            {hasUnreadNotification && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-error rounded-full ring-2 ring-bg-surface" />
            )}
          </button>

          {/* Profile Avatar */}
          <div 
            id="profile-dropdown-trigger"
            onClick={() => onOpenMockModal("Account Profile: Authorized as Sales Director (Cardiology Div).")}
            className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer hover:opacity-80 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
              OD
            </div>
            <div className="hidden xl:block text-left">
              <span className="block text-xs font-bold text-white -mb-0.5">O. Debata</span>
              <span className="block text-[9px] text-text-sec">Territory Director</span>
            </div>
          </div>

        </div>

      </div>
    </nav>
  );
}

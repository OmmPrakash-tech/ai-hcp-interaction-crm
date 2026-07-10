import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Stethoscope, MapPin, Mail, Calendar, ArrowRight, UserPlus, Filter } from "lucide-react";
import { doctorsList } from "@/data";
import { useMemo } from "react";


interface DoctorsDatabaseProps {
  onLogVisitForDoc: (docName: string) => void;
}

export function DoctorsDatabase({ onLogVisitForDoc }: DoctorsDatabaseProps) {
  const DEFAULT_SPECIALTY = "All";

const [searchQuery, setSearchQuery] = useState("");
const [specialtyFilter, setSpecialtyFilter] =
  useState(DEFAULT_SPECIALTY);

const specialties = useMemo(
  () => [
    DEFAULT_SPECIALTY,
    ...Array.from(
      new Set(doctorsList.map((doctor) => doctor.specialty))
    ),
  ],
  []
);

const filteredDoctors = useMemo(() => {
  return doctorsList.filter((doctor) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      doctor.name.toLowerCase().includes(search) ||
      doctor.institution.toLowerCase().includes(search) ||
      doctor.email.toLowerCase().includes(search) ||
      doctor.specialty.toLowerCase().includes(search);

    const matchesSpecialty =
      specialtyFilter === DEFAULT_SPECIALTY ||
      doctor.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });
}, [searchQuery, specialtyFilter]);

  return (
    <div id="doctors-database-view" className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-5">
          <div>
            <h2 className="text-xl font-bold font-display text-white">Healthcare Professionals Directory</h2>
            <p className="text-xs text-text-sec mt-1">Territory target HCP registry with associated specialties and institutions.</p>
          </div>
          <button
            id="btn-register-doctor"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 text-white text-xs font-semibold flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <UserPlus size={14} className="text-brand-primary" />
            Add New HCP
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="relative sm:col-span-2">
            <Search size={14} className="absolute left-3 top-3 text-text-sec" />
            <input
              id="doctor-search-input"
              type="text"
              placeholder="Search by Doctor name, clinic, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl text-white glass-input font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={14} className="text-text-sec" />
            <select
              id="doctor-specialty-filter"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl text-white bg-bg-surface glass-input font-sans appearance-none"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[calc(100vh-380px)] pr-1">
          {filteredDoctors.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="glass-card rounded-2xl p-4 border border-white/5 hover:border-white/10 glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  {/* Doctor Icon Circle */}
                  <div className={`w-9 h-9 rounded-xl ${doc.avatarColor} bg-opacity-20 text-white flex items-center justify-center font-bold font-display flex-shrink-0`}>
                    {doc.name.split(" ").pop()?.charAt(0)}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                      {doc.name}
                    </h3>
                    <p className="text-[10px] text-brand-primary font-semibold flex items-center gap-1 mt-0.5">
                      <Stethoscope size={10} />
                      {doc.specialty}
                    </p>
                  </div>
                </div>

                {/* Institution & Contact details */}
                <div className="mt-3 space-y-1.5 border-t border-white/5 pt-3 text-[11px] text-text-sec">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-text-sec/50" />
                    <span>{doc.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-text-sec/50" />
                    <span className="font-mono">{doc.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-text-sec/50" />
                    <span>Last visit: {doc.lastInteraction} • {doc.frequency}</span>
                  </div>
                </div>
              </div>

              {/* Visit action button */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  doc.sentiment === "Positive" 
                    ? "bg-brand-success/10 border border-brand-success/20 text-brand-success" 
                    : "bg-brand-warning/10 border border-brand-warning/20 text-brand-warning"
                }`}>
                  {doc.sentiment} Sentiment
                </span>

                <button
                  id={`btn-log-visit-${doc.id}`}
                  onClick={() => onLogVisitForDoc(doc.name)}
                  className="px-3 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-brand-primary text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                >
                  <span>Draft Interaction</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

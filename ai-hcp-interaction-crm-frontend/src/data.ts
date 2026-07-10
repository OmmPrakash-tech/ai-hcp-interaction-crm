import { HCPInteraction } from "./types";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  institution: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  lastInteraction: string;
  frequency: string;
  email: string;
  avatarColor: string;
}

export const doctorsList: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sarah Jenkins",
    specialty: "Interventional Cardiology",
    institution: "St. Jude Heart Institute",
    sentiment: "Positive",
    lastInteraction: "2026-07-10",
    frequency: "Bi-weekly",
    email: "s.jenkins@stjudehospital.org",
    avatarColor: "bg-blue-500",
  },
  {
    id: "doc-2",
    name: "Dr. Robert Vance",
    specialty: "Cardiovascular Medicine",
    institution: "Metro Health Cardiology",
    sentiment: "Neutral",
    lastInteraction: "2026-07-08",
    frequency: "Monthly",
    email: "rvance@metrohealth.com",
    avatarColor: "bg-purple-500",
  },
  {
    id: "doc-3",
    name: "Dr. Gregory House",
    specialty: "Diagnostic Medicine",
    institution: "Princeton-Plainsboro Teaching Hospital",
    sentiment: "Neutral",
    lastInteraction: "2026-07-05",
    frequency: "On-demand",
    email: "ghouse@ppth.org",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "doc-4",
    name: "Dr. Allison Cameron",
    specialty: "Immunology",
    institution: "Princeton-Plainsboro Teaching Hospital",
    sentiment: "Positive",
    lastInteraction: "2026-06-29",
    frequency: "Monthly",
    email: "acameron@ppth.org",
    avatarColor: "bg-pink-500",
  },
  {
    id: "doc-5",
    name: "Dr. Eric Foreman",
    specialty: "Neurology",
    institution: "Mercy General Clinic",
    sentiment: "Positive",
    lastInteraction: "2026-06-25",
    frequency: "Quarterly",
    email: "eforeman@mercygeneral.org",
    avatarColor: "bg-amber-500",
  },
];

export const initialPastInteractions: HCPInteraction[] = [
  {
    hcpName: "Dr. Sarah Jenkins",
    interactionType: "In-Person Meeting",
    date: "2026-07-10",
    time: "14:00",
    attendees: ["Dr. Sarah Jenkins", "Rep John Doe"],
    topicsDiscussed: ["Cardioxa safety updates", "Phase 3 clinical trial"],
    sentiment: "Positive",
    materialsShared: ["Phase 3 Reprint Booklet", "Dosing Guideline Monograph"],
    notes: "Dr. Jenkins showed incredible receptivity to our trial safety profile. She intends to prescribe Cardioxa to ten first-line heart failure patients starting next week.",
  },
  {
    hcpName: "Dr. Robert Vance",
    interactionType: "Virtual Call",
    date: "2026-07-08",
    time: "10:30",
    attendees: ["Dr. Robert Vance", "MSL Mark"],
    topicsDiscussed: ["Cardioxa price point", "Insurance coverage"],
    sentiment: "Neutral",
    materialsShared: ["Economic Value dossier"],
    notes: "Brief virtual sync regarding cost hurdles. Requested formal communication on state Medicaid coverage timeline.",
  },
  {
    hcpName: "Dr. Gregory House",
    interactionType: "Email",
    date: "2026-07-05",
    time: "09:15",
    attendees: ["Dr. Gregory House"],
    topicsDiscussed: ["Rare side effects", "Interactions"],
    sentiment: "Neutral",
    materialsShared: ["Prescribing Information (Full)"],
    notes: "House inquired via email with challenging questions on pediatric counter-indications. Sent full prescribing documentation for diagnostics.",
  },
];

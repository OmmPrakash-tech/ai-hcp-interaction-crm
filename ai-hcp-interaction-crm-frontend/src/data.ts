import { HCPInteraction } from "@/types/interaction";

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
  
];

export const initialPastInteractions: HCPInteraction[] = [
  
];

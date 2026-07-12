import { HCPInteraction } from "./types/interaction";


export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  extractedFields?: Partial<HCPInteraction>;
}

export interface Metric {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

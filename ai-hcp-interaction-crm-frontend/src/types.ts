export interface HCPInteraction {
  hcpName: string;
  interactionType: string;
  date: string;
  time: string;
  attendees: string[];
  topicsDiscussed: string[];
  sentiment: "Positive" | "Neutral" | "Negative" | "";
  materialsShared: string[];
  notes: string;
}

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

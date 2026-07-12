export interface HCPInteraction {
  id?: number;

  hcpName: string;
  interactionType: string;
  interactionDate: string;
  interactionTime: string;

  attendees: string[];

  topicsDiscussed: string[];

  sentiment: "Positive" | "Neutral" | "Negative";

  materialsShared: string[];

  notes: string;
}
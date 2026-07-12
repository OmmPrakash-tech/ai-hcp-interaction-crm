import { HCPInteraction } from "@/types/interaction";

export function mapInteraction(item: any): HCPInteraction {
  return {
    id: item.id,
    hcpName: item.hcp_name,
    interactionType: item.interaction_type,
    interactionDate: item.interaction_date,
    interactionTime: item.interaction_time,
    attendees: item.attendees,
    topicsDiscussed: item.topics_discussed,
    sentiment: item.sentiment,
    materialsShared: item.materials_shared,
    notes: item.notes,
  };
}
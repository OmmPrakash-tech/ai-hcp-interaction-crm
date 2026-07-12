import api from "./api";

export interface InteractionPayload {
  hcpName: string;
  interactionType: string;
  interactionDate: string;
  interactionTime: string;
  attendees: string[];
  topicsDiscussed: string[];
  sentiment: string;
  materialsShared: string[];
  notes: string;
}

export async function createInteraction(
  data: InteractionPayload
) {
  const response = await api.post("/interaction/", {
    hcp_name: data.hcpName,
    interaction_type: data.interactionType,
    interaction_date: data.interactionDate,
    interaction_time: data.interactionTime,
    attendees: data.attendees,
    topics_discussed: data.topicsDiscussed,
    sentiment: data.sentiment,
    materials_shared: data.materialsShared,
    notes: data.notes,
  });

  return response.data;
}

export async function getInteractions() {
  const response = await api.get("/interaction/");
  return response.data;
}

export async function deleteInteraction(id: number) {
  await api.delete(`/interaction/${id}`);
}

export async function updateInteraction(
  id: number,
  data: InteractionPayload
) {
  const response = await api.put(
    `/interaction/${id}`,
    {
      hcp_name: data.hcpName,
      interaction_type: data.interactionType,
      interaction_date: data.interactionDate,
      interaction_time: data.interactionTime,
      attendees: data.attendees,
      topics_discussed: data.topicsDiscussed,
      sentiment: data.sentiment,
      materials_shared: data.materialsShared,
      notes: data.notes,
    }
  );

  return response.data;
}
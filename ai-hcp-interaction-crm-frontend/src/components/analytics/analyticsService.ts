import api from "@/services/api";

export async function getAnalytics() {
  const response = await api.get("/analytics/");
  return response.data;
}
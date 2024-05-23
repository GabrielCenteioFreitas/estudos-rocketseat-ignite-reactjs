import { api } from "@/services/api";

export async function getContinentInfos(slug: string) {
  const response = await api.get(`/continents/${slug}`)
  const { data } = response

  return data
}
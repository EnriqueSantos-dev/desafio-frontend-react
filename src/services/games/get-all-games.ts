import { api } from "@/lib/axios";
import { Games } from "@/types";

const TIMEOUT = 5000;

export async function getAllGames(): Promise<Games> {
  const { data } = await api.get("/data", { timeout: TIMEOUT });
  return data;
}

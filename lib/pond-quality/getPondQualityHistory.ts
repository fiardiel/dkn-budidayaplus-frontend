'use server'

import { PondQualityHistory } from "@/types/pond-quality";
import { cookies } from "next/headers";

export async function getPondQualityHistory(cycleId: string, pondId: string): Promise<PondQualityHistory> {
  const accessToken = cookies().get("accessToken")?.value;
  const API_BASE_URL = process.env.API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/api/pond-quality/${cycleId}/${pondId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.detail)
  }

  return data
}
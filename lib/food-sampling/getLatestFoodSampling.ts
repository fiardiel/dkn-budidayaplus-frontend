'use server'

import { FoodSampling } from "@/types/food-sampling";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getLatestFoodSampling(pondId: string, cycleId: string): Promise<FoodSampling | undefined> {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/food-sampling/${cycleId}/${pondId}/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.ok ? await res.json() : undefined;
  } catch {
    return undefined
  }
}

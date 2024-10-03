'use server'

import { FishSamplingInputForm } from "@/types/fish_sampling";

export async function addFishSampling(data: FishSamplingInputForm, token: string): Promise<{ success: boolean; message?: string }>  {
  const response = await fetch(`${process.env.API_BASE_URL}/api/pond/[id]`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { success: false };
  }
  return { success: true };
}
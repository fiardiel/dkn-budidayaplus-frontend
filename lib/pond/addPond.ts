'use server'

import { PondInputForm } from "@/types/pond/inputpond";

export async function addPond(data: PondInputForm, token: string): Promise<{ success: boolean; message?: string }>  {
  const response = await fetch(`${process.env.API_BASE_URL}/api/pond/`, {
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

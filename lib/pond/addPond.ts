'use server'

import { PondInputForm } from "@/types/pond";
import { cookies } from "next/headers";

export async function addPond(data: PondInputForm): Promise<{ success: boolean; message?: string }>  {
  const token = cookies().get('accessToken')?.value
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

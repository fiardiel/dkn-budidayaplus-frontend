'use server'

import { PondAddForm } from "@/types/pond/inputpond";

export async function addPond(data: PondAddForm, token: string): Promise<{ success: boolean; message?: string }>  {
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

export async function deletePond(pondId: string) {
  const token = document.cookie.split('accessToken=')[1];
  const response = await fetch(`${process.env.API_BASE_URL}/ponds/${pondId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return { success: false };
  }
  return { success: true };
}

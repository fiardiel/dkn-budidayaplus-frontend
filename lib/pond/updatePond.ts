'use server';

import { PondAddForm } from "@/types/pond/addpond";

export async function updatePond(pondId: string, data: PondAddForm, token: string): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`${process.env.API_BASE_URL}/api/pond/${pondId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { success: false, message: `Failed to update pond with ID ${pondId}` };
  }
  return { success: true };
}
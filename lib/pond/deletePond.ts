'use server'

import { cookies } from "next/headers";

export async function deletePond(pondId: string) {
    const accessToken = cookies().get("accessToken")?.value;
    const response = await fetch(`${process.env.API_BASE_URL}/api/pond/${pondId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      return { success: false };
    }
    return { success: true };
  }
'use server'

import { cookies } from "next/headers"

export async function createCycle(data: {
  start_date: string;
  end_date: string;
  pond_fish_amount: {
    pond_id: string;
    fish_amount: number;
  }[];
}) {
  const token = cookies().get('accessToken')?.value
  const response = await fetch(`${process.env.API_BASE_URL}/api/cycle/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorRes = await response.json();
    return { success: false, message: errorRes.detail }
  }

  return { success: true, message: 'Siklus tambak berhasil dibuat' }
}
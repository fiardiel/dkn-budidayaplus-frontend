'use server'

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function stopCycle(cycleId: string) {
  const token = cookies().get('accessToken')?.value
  const response = await fetch(`${process.env.API_BASE_URL}/api/cycle/stop/${cycleId}/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorRes = await response.json()
    return { success: false, message: errorRes.detail }
  }

  revalidateTag('cycles')
  return { success: true, message: 'Siklus berhasil dihentikan' }
}

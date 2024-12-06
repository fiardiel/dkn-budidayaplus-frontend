'use server'

import { cookies } from "next/headers"
import { PondQualityThreshold } from '@/types/pond-quality';

const API_BASE_URL = process.env.API_BASE_URL

export async function fetchPondQualityThreshold(pondId: string, cycleId: string): Promise<{ status: string; violations: string[]; threshold: PondQualityThreshold } | undefined >  {
  const token = cookies().get('accessToken')?.value
  try {
    const response = await fetch(`${API_BASE_URL}/api/threshold/${cycleId}/${pondId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    if (!response.ok) {
      return undefined
    }
    return response.json()
  } catch {
    return undefined
  }
}
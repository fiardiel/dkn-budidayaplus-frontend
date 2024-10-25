'use server'

import { cookies } from "next/headers"

const API_BASE_URL = process.env.API_BASE_URL

export async function fetchFishSampling(pondId: string) {
  const token = cookies().get('accessToken')?.value
  try {
    const response = await fetch(`${API_BASE_URL}/api/fish-sampling/${pondId}/`, {
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
    throw new Error("Gagal terhubung ke server")
  }
}
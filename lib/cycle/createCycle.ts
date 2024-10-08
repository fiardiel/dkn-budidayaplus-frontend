'use server'

import { Cycle } from "@/types/cycle"
import { cookies } from "next/headers"

export async function createCycle(data: Cycle) {
  const token = cookies().get('accessToken')?.value
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/cycle/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error('Gagal membuat siklus tambak')
    }
    return response.json()
  } catch {
    throw new Error('Terjadi kesalahan pada server')
  }
}
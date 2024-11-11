'use server'

import { Pond } from "@/types/pond";
import { cookies } from "next/headers";

export async function fetchPonds(): Promise<Pond[]> {
  try {
    const token = cookies().get('accessToken')?.value
    const res = await fetch(`${process.env.API_BASE_URL}/api/pond/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    if (!res.ok) {
      return []
    }
    return data
  } catch {
    return []
  }
}

'use server'

import { Profile } from "@/types/profile"
import { cookies } from "next/headers"

export async function fetchWorkerList(): Promise<Profile[]> {
  const url = `${process.env.API_BASE_URL}/api/profile/workers-only`
  const accessToken = cookies().get('accessToken')?.value

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return response.ok ? response.json() : []
  } catch (err) {
    return []
  }
}

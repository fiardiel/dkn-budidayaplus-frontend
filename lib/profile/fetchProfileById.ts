'use server'

import { Profile } from "@/types/profile"
import { cookies } from "next/headers"

export async function fetchProfileById(username: string): Promise<Profile | undefined> {
  const url = `${process.env.API_BASE_URL}/api/profile/${username}/`
  const accessToken = cookies().get('accessToken')?.value

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return response.ok ? response.json() : undefined
  } catch (err) {
    return undefined
  }
}

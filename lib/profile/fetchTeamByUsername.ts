'use server'

import { Profile } from "@/types/profile"
import { cookies } from "next/headers"

export async function fetchTeamByUsername(username: string): Promise<Profile[]> {
  const API_URL = `${process.env.API_BASE_URL}/api/profile/team/${username}`
  const accessToken = cookies().get('accessToken')?.value

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await response.json()
    return response.ok ? data : []
  } catch (error) {
    return []
  }
}

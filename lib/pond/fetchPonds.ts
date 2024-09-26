import { Pond } from "@/types/pond";

export async function fetchPonds(accessToken?: string): Promise<Pond[]> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/pond/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await res.json()
    if (!res.ok) {
      return []
    }
    return data
  } catch (error) {
    return []
  }
}
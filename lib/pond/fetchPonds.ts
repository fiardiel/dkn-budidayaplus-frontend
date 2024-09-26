import { Pond } from "@/types/pond";

export async function fetchPonds(accessToken?: string): Promise<Pond[]> {
  const res = await fetch(`${process.env.API_BASE_URL}/api/pond/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message)
  } 
  return data
}
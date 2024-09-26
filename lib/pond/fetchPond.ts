import { Pond } from "@/types/pond"

export async function fetchPond(pondId: string, token?: string): Promise<Pond> {  
  const res = await fetch(`${process.env.API_BASE_URL}/pond/${pondId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message)
  }
  return data
}

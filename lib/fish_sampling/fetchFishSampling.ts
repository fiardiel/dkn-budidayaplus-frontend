import { FishSampling } from "@/types/fish_sampling"

export async function fetchFishSampling(pondId: string, token?: string): Promise<FishSampling> {  
  const res = await fetch(`${process.env.API_BASE_URL}/api/pond/${pondId}/`, {
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
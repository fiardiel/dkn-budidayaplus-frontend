import { getLatestPondQuality } from "@/lib/pond-quality"

export const fetchPondQuality = async (pondId: string, cycleId: string) => {
  try {
    const res = await getLatestPondQuality(pondId, cycleId)
    return res
  } catch (error) {
    return undefined
  }
}

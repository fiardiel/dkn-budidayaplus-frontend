import { fetchLatestFishSampling } from "@/lib/fish-sampling"

export const fetchFishSampling = async (pondId: string, cycleId: string) => {
  try {
    const res = await fetchLatestFishSampling(pondId, cycleId)
    return res
  } catch (error) {
    return undefined
  }
}

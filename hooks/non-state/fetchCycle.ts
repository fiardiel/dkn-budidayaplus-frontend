import { getLatestCycle } from "@/lib/cycle"

export const fetchCycle = async () => {
  try {
    const res = await getLatestCycle()
    return res
  } catch (error) {
    return undefined
  }
}

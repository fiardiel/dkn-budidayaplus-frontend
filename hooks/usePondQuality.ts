import { getLatestPondQuality } from "@/lib/pond-quality"
import { PondQuality } from "@/types/pond-quality"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useCycle } from "@/hooks/useCycle"

export const usePondQuality = (pondId: string) => {
  const [pondQuality, setPondQuality] = useState<PondQuality | undefined>(undefined)
  const pathname = usePathname()
  const cycle = useCycle()

  useEffect(() => {
    const fetchPondQuality = async () => {
      try {
        if (cycle) {
          const res = await getLatestPondQuality(pondId, cycle.id)
          setPondQuality(res)
        }
      } catch {
        setPondQuality(undefined)
      }
    }

    fetchPondQuality()

  }, [pondId, pathname, cycle])

  return { pondQuality, cycle }
}
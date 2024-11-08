import { PondQualityHistory } from "@/types/pond-quality"
import { useEffect, useState } from "react"
import { useCycle } from "@/hooks/useCycle"
import { usePathname } from "next/navigation"
import { getPondQualityHistory } from "@/lib/pond-quality"

export const usePondQualityHistory = (pondId: string) => {
  const [pondQualityHistory, setPondQualityHistory] = useState<PondQualityHistory | undefined>(undefined)
  const cycle = useCycle()
  const pathname = usePathname()
  
  useEffect(() => {
    const fetchPondQualityHistory = async () => {
      try {
        if (cycle) {
          const pondQualityHistory = await getPondQualityHistory(cycle.id, pondId)
          setPondQualityHistory(pondQualityHistory)
        }
      } catch {
        setPondQualityHistory(undefined)
      }
    }

    fetchPondQualityHistory()

    return () => {
      setPondQualityHistory(undefined)
    }
  }, [pondId, pathname, cycle])

  return pondQualityHistory
}
import { useEffect, useState } from "react"
import { useCycle } from "@/hooks/useCycle"
import { fetchFishSamplingHistory } from "@/lib/fish-sampling"
import { FishSamplingHistory } from "@/types/fish-sampling/fish-sampling-history"

export const useFishSamplingHistory = (pondId: string) => {
    const [fishSamplingHistory, setFishSamplingHistory] = useState<FishSamplingHistory|undefined>(undefined)
    const cycle = useCycle()

    useEffect(() => {
        const fetchFishSampling = async () => {
            if (cycle) {
                const fishSamplingHistory = await fetchFishSamplingHistory(pondId, cycle.id)
                setFishSamplingHistory(fishSamplingHistory)
            }
        }

        fetchFishSampling()

        return () => {
            setFishSamplingHistory(undefined)
        }
    }, [cycle])

    return fishSamplingHistory
}
import { useEffect, useState } from "react"
import { useCycle } from "@/hooks/useCycle"
import { FishSampling } from "@/types/fish-sampling"
import { fetchLatestFishSampling } from "@/lib/fish-sampling"

export const useLatestFishSampling = (pondId: string) => {
    const [fishSampling, setFishSampling] = useState<FishSampling|undefined>(undefined)
    const cycle = useCycle()

    useEffect(() => {
        const fetchFishSampling = async () => {
            if (cycle) {
                const fishSampling = await fetchLatestFishSampling(pondId, cycle.id)
                setFishSampling(fishSampling)
            }
        }

        fetchFishSampling()

        return () => {
            setFishSampling(undefined)
        }
    }, [cycle])

    return fishSampling
}
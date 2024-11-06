import { getLatestFoodSampling } from "@/lib/food-sampling"
import { FoodSampling } from "@/types/food-sampling"
import { useEffect, useState } from "react"
import { useCycle } from "@/hooks/useCycle"

export const useFoodSampling = (pondId: string) => {
  const [foodSampling, setFoodSampling] = useState<FoodSampling | undefined>(undefined)
  const cycle = useCycle()

  useEffect(() => {
    const fetchFoodSampling = async () => {
      if (cycle) {
        const res = await getLatestFoodSampling(pondId, cycle.id)
        setFoodSampling(res)
      }
    }

    fetchFoodSampling()

  }, [cycle])

  return foodSampling
}
import { FoodSampling } from "@/types/food-sampling";

export type FoodSamplingHistory = {
    food_samples: FoodSampling[],
    cycle_id: string
}
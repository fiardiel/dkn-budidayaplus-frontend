import { PondQuality } from "@/types/pond-quality";

export type PondQualityHistory = {
  pond_qualities: PondQuality[],
  cycle_id: string
}
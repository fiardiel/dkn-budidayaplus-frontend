import User from "@/types/auth/user"

export type PondQuality = {
  id: string
  pond: string
  reporter: User,
  cycle: string
  recorded_at: Date
  image_name: string
  ph_level: number
  salinity: number
  water_temperature: number
  water_clarity: number
  water_circulation: number
  dissolved_oxygen: number
  orp: number
  ammonia: number
  nitrate: number
  phosphate: number
}

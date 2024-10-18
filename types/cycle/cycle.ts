export type Cycle = {
  id: string,
  start_date: Date,
  end_date: Date,
  supervisor: string,
  pond_fish_amount: PondFishAmount[]
}

export type PondFishAmount = {
  id: string,
  pond_id: string,
  fish_amount: number
}
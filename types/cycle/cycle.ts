export type Cycle = {
  id: string,
  start_date: Date,
  end_date: Date,
  pond_fish: {
    pond_id: string,
    fish_amount: number
  }[]
}
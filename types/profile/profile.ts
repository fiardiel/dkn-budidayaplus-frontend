import User from "@/types/auth/user"

export type Profile = {
  id: number
  user: User
  image_name: string
}

export type Worker = {
  id : string
  first_name: string
  last_name: string
  phone_number: string
}
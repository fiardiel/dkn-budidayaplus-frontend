export interface UserProfile {
  id: string;
  user: User;
  image_name?: string;
}

export interface User {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
}
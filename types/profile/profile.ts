export type UserProfile = {
    id: string;
    user: User;
    image_name: string;
}
  
export type User = {
    phone_number: string,
    first_name: string,
    last_name: string,
}
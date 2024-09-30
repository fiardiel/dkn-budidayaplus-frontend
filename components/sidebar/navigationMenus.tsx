import { CircleCheckBig, FishSymbol, House, User } from "lucide-react";

export const navigationMenus = [
  {
    uid: 'fa470feb-f0a1-4316-a264-7d0ea5c18b56',
    name: 'Home',
    href: '/',
    icon: <House />
  },
  {
    uid: '4b2b0bd1-053c-4db4-971f-b604c2f4dba6',
    name: 'Profile',
    href: '/profile',
    icon: <User />
  },
  {
    uid: 'a04f1920-af4f-46e7-9fd5-39438f2c5e6c',
    name: 'Task', 
    href: '/task',
    icon: <CircleCheckBig size={21} />
  },
  {
    uid: 'd53a3975-1930-4f05-88db-b0ecffb11598',
    name: 'Pond',
    href: '/pond',
    icon: <FishSymbol />
  },
]
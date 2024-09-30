import { CircleCheckBig, FishSymbol, House, User } from "lucide-react";

export const navigationMenus = [
  {
    name: 'Home',
    href: '/',
    icon: <House />
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: <User />
  },
  {
    name: 'Task', 
    href: '/task',
    icon: <CircleCheckBig size={21} />
  },
  {
    name: 'Pond',
    href: '/pond',
    icon: <FishSymbol />
  },
]
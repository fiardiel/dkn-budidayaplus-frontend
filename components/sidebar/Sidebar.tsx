'use client'

import React, { useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { navigationMenus } from '@/components/sidebar';
import { logout } from '@/lib/auth/logout/logoutAction';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const handleLogout = async () => {
    logout()
    setOpen(false)
  }
  const username = user?.phone_number || '';
  return (
    <div className='flex items-center justify-center bg-white border-b border-neutral-300/40 shadow-sm h-20 fixed top-0 w-full sm:hidden z-50'>
      <div className='w-[80%]'>
        <Drawer direction='left' open={open} onOpenChange={setOpen}>
          <DrawerTrigger className='pt-3'> <Menu /> <span className='sr-only'>Sidebar Trigger</span> </DrawerTrigger>
          <DrawerContent className='h-full w-[290px] rounded-tl-none rounded-r-xl' aria-describedby='sidebar-description'>
            <DrawerHeader aria-describedby='sidebar-description' className='flex items-center justify-between'>
              <DrawerTitle className='text-3xl'>
                Budidaya<span className='text-blue-500 font-normal'>Plus</span>
              </DrawerTitle>
              <DrawerClose aria-label='Sidebar Close'>
                <X />
              </DrawerClose>
            </DrawerHeader>

            <DrawerDescription className='sr-only hidden' />

            {user && (
              <div className='flex gap-4 p-4 items-center'>
                <Avatar data-testid='avatar' className='w-12 h-12'>
                  <AvatarImage />
                  <AvatarFallback>BP</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start'>
                  <p className='font-semibold'>
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className='font-normal text-sm -mt-1'>
                    Aquaculturist
                  </p>
                </div>
              </div>
            )}

            <div className='mt-4'>
              <div className='flex flex-col w-full'>
                {navigationMenus.map((menu) => (
                  <Link
                    key={menu.uid}
                    href={menu.name === 'Profile' ? `/profile/${username}` : menu.href}
                    onClick={() => setOpen(false)}
                  >
                    <div className='flex items-center text-lg rounded-xl gap-4 w-full p-4 py-3 hover:bg-neutral-100 transition duration-200'>
                      {menu.icon}{menu.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {user && (
              <DrawerFooter>
                <Button
                  className='flex gap-2 text-red-500 hover:bg-red-200/90 bg-red-200/50 transition duration-200'
                  onClick={handleLogout}
                >
                  <LogOut className='-ml-2' />
                  Logout
                </Button>
              </DrawerFooter>
            )}
          </DrawerContent>
        </Drawer>
      </div>

    </div>
  )
}

export default Sidebar

'use client'

import React from 'react';
import type { Profile } from '@/types/profile';
import Image from 'next/image';
import { UpdateProfileModal } from '@/components/profile';
import { LogOut } from 'lucide-react';
import { logout } from '@/lib/auth/logout/logoutAction';

interface UserProfileProps {
  profile: Profile;
  isUserSelf?: boolean;
}

const ProfileComponent: React.FC<UserProfileProps> = ({ profile, isUserSelf }) => {
  const fallbackImgSrc = 'fallbackimage.png'
  return (
    <div className='flex flex-col py-10 items-center'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-6'>
          <div className='flex justify-between'>
            <div>
              <p className='text-3xl font-semibold'>
                {profile.user.first_name} {profile.user.last_name}
              </p>
              <p className='text-lg mt-1'>
                {profile.user.phone_number}
              </p>
            </div>
            <button onClick={() => logout()} className='h-7'>
              <LogOut className='text-red-500 mt-2 h-7 w-7' />
            </button>
          </div>
          {isUserSelf && (
            <div className='flex flex-col gap-2'>
              <UpdateProfileModal profile={profile} />
            </div>
          )}
          <div>
            <p>
              <Image className='object-cover h-full w-full' src={`/${fallbackImgSrc}`} width={500} height={400} alt={`${profile.user.first_name} image`} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

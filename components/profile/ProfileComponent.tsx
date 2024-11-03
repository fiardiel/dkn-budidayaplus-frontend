'use client'

import React from 'react';
import type { Profile } from '@/types/profile';
import Image from 'next/image';

interface UserProfileProps {
  profile: Profile;
}

const ProfileComponent: React.FC<UserProfileProps> = ({ profile }) => {
  const fallbackImgSrc = 'fallbackimage.png'
  return (
    <div className='min-h-[100vh] flex flex-col py-10 items-center mt-20'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-10'>
          <div>
            <p className='text-3xl'>Detail Profile</p>
            <p className='text-3xl font-semibold'>
              {profile.user.first_name} {profile.user.last_name}
            </p>
          </div>
          <div>
            <p>
              <Image className='object-cover h-full w-full' src={`/${fallbackImgSrc}`} width={500} height={400} alt={`${profile.user.first_name} image`} />
            </p>
          </div>
          <div>
            <p>
              <strong>First Name:</strong> {profile.user.first_name}
            </p>
          </div>
          <div>
            <p>
              <strong>Last Name:</strong> {profile.user.last_name}
            </p>
          </div>
          <div>
            <p>
              <strong>Phone Number:</strong> {profile.user.phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
'use client'

import React from 'react';
import type { Profile, Worker } from '@/types/profile';
import Image from 'next/image';
import { UpdateProfileModal } from '@/components/profile';
import { Span } from 'next/dist/trace';

interface UserProfileProps {
  profile: Profile;
  isUserSelf?: boolean;
  workers: Worker[]|undefined;
}

const ProfileComponent: React.FC<UserProfileProps> = ({ profile, isUserSelf , workers}) => {
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
            <p className='text-lg mt-1'>
              {profile.user.phone_number}
            </p>
          </div>
          <div>
            <p>
              <Image className='object-cover h-full w-full' src={`/${fallbackImgSrc}`} width={500} height={400} alt={`${profile.user.first_name} image`} />
            </p>
          </div>
          {isUserSelf && (
            <>
              <div className='flex flex-col gap-2'>
                <UpdateProfileModal profile={profile} />
              </div>
              {workers && (
                <>
                  <p className='text-3xl'>Workers List</p>
                  <ol className = 'list-decimal pl-4'>
                    {
                      workers.map(worker => {
                        return <li>{worker.first_name +' '+  worker.last_name} {(profile.user.phone_number === worker.phone_number ? <span>(Supervisor)</span>:<span></span>)}</li>
                      })
                    }
                  </ol>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;

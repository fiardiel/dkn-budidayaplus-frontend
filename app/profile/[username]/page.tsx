import React from 'react';
import { fetchProfile } from '@/lib/profile';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { getUser } from '@/lib/auth';
import { Team } from '@/components/profile';

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const profile = await fetchProfile(params.username);
  const user = await getUser();

  if (!profile) {
    return (
      <div className='mt-20 w-full flex justify-center'>
        <div className='mt-20 w-[80%] text-center'>
          Profile not found
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      <ProfileComponent isUserSelf={user?.id === profile.user.id} profile={profile} />
      <Team username={params.username} />
    </div>
  );
};

export default ProfilePage;

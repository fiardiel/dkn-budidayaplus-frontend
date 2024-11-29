import React from 'react';
import { fetchProfile, getWorkers } from '@/lib/profile';
import ProfileComponent from '@/components/profile/ProfileComponent';
import { getUser } from '@/lib/auth';

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  const profile = await fetchProfile(params.username);
  const user = await getUser();
  const workers = await getWorkers();

  if (!profile) {
    return (
      <div className='mt-20 w-full flex justify-center'>
        <div className='mt-20 w-[80%] text-center'>
          Profile not found
        </div>
      </div>
    )
  }

  return <ProfileComponent isUserSelf={user?.id === profile.user.id} profile={profile} workers = {workers} />;
};

export default ProfilePage;

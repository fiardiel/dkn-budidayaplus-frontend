import { fetchProfile } from '@/lib/profile';
import { UserProfile } from '@/types/profile';
import Profile from '@/components/profile/Profile';
import React from 'react';

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  let profile: UserProfile | undefined;

  try {
    profile = await fetchProfile(params.username);
  } catch (error) {
    profile = undefined;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <Profile profile={profile} />;
};

export default ProfilePage;
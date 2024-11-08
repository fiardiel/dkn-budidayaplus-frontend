import { fetchProfile } from '@/lib/profile';
import { Profile } from '@/types/profile';
import ProfileComponent from '@/components/profile/ProfileComponent';
import React from 'react';

interface ProfilePageProps {
  params: { username: string };
}

const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
  let profile: Profile | undefined;

  try {
    profile = await fetchProfile(params.username);
  } catch (error) {
    profile = undefined;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <ProfileComponent profile={profile} />;
};

export default ProfilePage;
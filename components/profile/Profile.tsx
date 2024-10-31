import React from 'react';
import type { UserProfile } from '@/types/profile';

interface UserProfileProps {
  profile: UserProfile;
}

const Profile: React.FC<UserProfileProps> = ({ profile }) => {
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
          <div>
            <p>
              <strong>Image Name:</strong> {profile.image_name || 'No image'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
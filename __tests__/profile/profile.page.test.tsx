import { Profile } from '@/types/profile';
import { before } from 'node:test';
import { boolean } from 'zod';

jest.mock("@/lib/profile", () => ({
  fetchProfile: jest.fn(),
}));

jest.mock("@/components/profile", () => ({
  ProfileComponent: ({ profile, isUserSelf }: { profile: Profile, isUserSelf: boolean }) => {
    return (
      <div>
        <p>{profile.user.first_name} {profile.user.last_name}</p>
        <p>{isUserSelf}</p>
      </div>)
  }
}))

const mockProfile: Profile = {
  id: 1,
  user: {
    first_name: "Apple",
    last_name: "Pie",
    phone_number: "1234567890",
    id: 0
  },
  image_name: "profile1.jpg"
};

describe('Profile Detail Page', () => {
  beforeEach(async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfile);
  });
}

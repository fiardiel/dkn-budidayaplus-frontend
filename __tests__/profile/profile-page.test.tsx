import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/profile/[username]/page';
import { fetchProfile, getWorkers } from '@/lib/profile';
import { Profile, Worker } from '@/types/profile';
import User from '@/types/auth/user';
import { getUser } from '@/lib/auth';
import { get } from 'http';

jest.mock("@/lib/profile", () => ({
  fetchProfile: jest.fn(),
  getWorkers: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  getUser: jest.fn(),
}));


jest.mock("@/components/profile", () => ({
  UpdateProfileModal: () => {
    return (
      <div>
        <p>Update Profile</p>
      </div>
    )
  }
}));

const mockUser: User = {
  id: 1,
  first_name: "Apple",
  last_name: "Pie",
  phone_number: "1234567890",
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    user: mockUser,
    image_name: "profile1.jpg"
  },
];

const mockWorkers: Worker[] = [
  {
    id: "1",
    first_name: mockUser.first_name,
    last_name: mockUser.last_name,
    phone_number: mockUser.phone_number,
  },
  {
    id: "2",
    first_name: "Lala",
    last_name: "Lele",
    phone_number: "089512345678",
  },
]


describe('Profile detail page', () => {
  beforeEach(async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfiles.find(profile => profile.id === 1));
    (getUser as jest.Mock).mockResolvedValue(mockUser);
    (getWorkers as jest.Mock).mockResolvedValue(mockWorkers);
  });

  it('renders the profile detail page with full name and phone number', async () => {
    render(await ProfilePage({ params: { username: '1234567890' } }));
    const profileImage = await screen.findByAltText("Apple image");
    await waitFor(() => {
      expect(screen.getByText("Detail Profile")).toBeInTheDocument();
      const texts = screen.getAllByText("Apple Pie")
      expect(texts[0]).toBeInTheDocument();

      expect(profileImage).toHaveAttribute("src", "/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");
      expect(screen.getByText("1234567890")).toBeInTheDocument();

      expect(texts[1]).toBeInTheDocument();
      expect(screen.getByText("Lala Lele")).toBeInTheDocument()
    });
  });

  it('renders no profile message', async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(undefined);
    render(await ProfilePage({ params: { username: '1234567890' } }));

    await waitFor(() => {
      expect(screen.getByText("Profile not found")).toBeInTheDocument();
    });
  });

  it('renders default image name when image_name is not provided', async () => {
    const mockProfileWithoutImage: Profile = {
      id: 2,
      user: {
        first_name: "Banana",
        last_name: "Split",
        phone_number: "0987654321",
        id: 0
      },
      image_name: "",
    };

    (fetchProfile as jest.Mock).mockResolvedValue(mockProfileWithoutImage);
    render(await ProfilePage({ params: { username: '0987654321' } }));

    await waitFor(() => {
      expect(screen.getByText('Detail Profile')).toBeInTheDocument();
      expect(screen.getByText('Banana Split')).toBeInTheDocument();
      const profileImage = screen.getByAltText('Banana image');
      expect(profileImage).toHaveAttribute("src", "/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");
    });
  });

  it('handles the profile when the user is not the owner of the profile', async () => {
    const mockProfile: Profile = {
      id: 2,
      user: {
        first_name: "Random",
        last_name: "Person",
        phone_number: "08123456789",
        id: 0
      },
      image_name: "",
    };
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfile);
    render(await ProfilePage({ params: { username: '08123456789' } }));

    await waitFor(() => {
      expect(screen.queryByText('Update Profile')).toBeNull();
    });
  })

  it('handles the profile when the user is the owner of the profile', async () => {
    render(await ProfilePage({ params: { username: '08123456789' } }));

    await waitFor(() => {
      expect(screen.getByText('Update Profile')).toBeInTheDocument();
    });
  })
})

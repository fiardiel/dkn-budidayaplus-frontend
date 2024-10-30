import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/profile/[id]/';
import { fetchProfile } from '@/lib/profile';
import { Profile } from '@/types/profile';

jest.mock("@/lib/profile", () => ({
  fetchProfile: jest.fn(),
}));

const mockProfiles: Profile[] = [
  { id: '12345', first_name: "Apple", last_name: "Pie", phone_number: "1234567890", image_name: "profile1.jpg" },
];

describe('Profile detail page', () => {
  beforeEach(async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfiles.find(profile => profile.id === '12345'));
  });

  it('renders the profile detail page with full name and phone number', async () => {
    render(await ProfilePage({ params: { id: '12345' } }));
    await waitFor(() => {
      expect(screen.getByText("Welcome to the profile of")).toBeInTheDocument();
      expect(screen.getByText("Apple Pie")).toBeInTheDocument(); 
      expect(screen.getByText("Phone Number: 1234567890")).toBeInTheDocument(); 
      expect(screen.getByRole("button", { name: /edit profile/i })).toBeInTheDocument();
    });
  });

  it('renders no profile message', async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(undefined);
    render(await ProfilePage({ params: { id: '12345' } }));
    
    await waitFor(() => {
      expect(screen.getByText("Profile not found")).toBeInTheDocument();
    });
  });

  it('handles the error case of fetching profiles', async () => {
    (fetchProfile as jest.Mock).mockRejectedValue(new Error("Failed to fetch profile"));
    render(await ProfilePage({ params: { id: '12345' } }));
    
    await waitFor(() => {
      expect(screen.getByText("Profile not found")).toBeInTheDocument();
    });
  });

  it('renders the profile image', async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfiles.find(profile => profile.id === '12345'));
    render(await ProfilePage({ params: { id: '12345' } }));
    const profileImage = await screen.findByAltText("Apple Pie image");
    await waitFor(() => {
      expect(profileImage).toHaveAttribute("src", "/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");
    });
  });
});
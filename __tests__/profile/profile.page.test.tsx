import { render, screen, waitFor } from '@testing-library/react';
import ProfilePage from '@/app/profile/[username]/page';
import { fetchProfile } from '@/lib/profile';
import { Profile } from '@/types/profile';

jest.mock("@/lib/profile", () => ({
  fetchProfile: jest.fn(),
}));

const mockProfiles: Profile[] = [
    { 
      id: 1, 
      user: {
        first_name: "Apple",
        last_name: "Pie",
        phone_number: "1234567890",
        id: 0
      }, 
      image_name: "profile1.jpg" 
    },
  ];

describe('Profile detail page', () => {
  beforeEach(async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(mockProfiles.find(profile => profile.id === 1));
  });

  it('renders the profile detail page with full name and phone number', async () => {
    render(await ProfilePage({ params: { username: '1234567890' } }));
    const profileImage = await screen.findByAltText("Apple image");
    await waitFor(() => {
      expect(screen.getByText("Detail Profile")).toBeInTheDocument();
      expect(screen.getByText("Apple Pie")).toBeInTheDocument();
      
      expect(profileImage).toHaveAttribute("src", "/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");

      expect(screen.getByText("First Name:")).toBeInTheDocument();
      expect(screen.getByText("Apple")).toBeInTheDocument();
      
      expect(screen.getByText("Last Name:")).toBeInTheDocument();
      expect(screen.getByText("Pie")).toBeInTheDocument();
      
      expect(screen.getByText("Phone Number:")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
    });
  });

  it('renders no profile message', async () => {
    (fetchProfile as jest.Mock).mockResolvedValue(undefined);
    render(await ProfilePage({ params: { username: '1234567890' } }));
    
    await waitFor(() => {
      expect(screen.getByText("Profile not found")).toBeInTheDocument();
    });
  });

  it('handles the error case of fetching profiles', async () => {
    (fetchProfile as jest.Mock).mockRejectedValue(new Error("Failed to fetch profile"));
    render(await ProfilePage({ params: { username: '1234567890'  } }));
    
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
      image_name: "", // No image provided
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
});
import { ProfileComponent } from '@/components/profile';

describe('Profile index export', () => {
  it('should export the Profile component', () => {
    expect(ProfileComponent).toBeDefined();
    expect(ProfileComponent).toBeInstanceOf(Function); 
  });
});
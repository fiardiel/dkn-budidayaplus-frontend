import { Profile } from '@/components/profile';

describe('Profile index export', () => {
  it('should export the Profile component', () => {
    expect(Profile).toBeDefined();
    expect(Profile).toBeInstanceOf(Function); 
  });
});
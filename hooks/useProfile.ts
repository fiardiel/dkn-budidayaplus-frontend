import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { getProfile } from "@/lib/profile";
import { Profile } from "@/types/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const pathname = usePathname()

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setProfile(profile);
    };
    fetchProfile();

    return () => {
      setProfile(undefined);
    };
  }, [pathname]);

  return profile
}
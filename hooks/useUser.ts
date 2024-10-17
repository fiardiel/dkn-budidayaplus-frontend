import { useEffect, useState } from "react";
import User from "@/types/auth/user";
import { getUser } from "@/lib/auth/user/get-user";
import { usePathname, useSearchParams } from "next/navigation";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();

    return () => {
      setUser(null);
    };
  }, [pathname, searchParams]);

  return user
}
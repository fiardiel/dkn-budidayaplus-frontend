import { useEffect, useState } from "react";
import User from "@/types/auth/user";
import { getUser } from "@/lib/auth/user/get-user";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();

    return () => {
      setUser(null);
    };
  }, []);

  return user
}
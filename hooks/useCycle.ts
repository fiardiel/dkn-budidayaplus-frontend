import { getLatestCycle } from "@/lib/cycle";
import { Cycle } from "@/types/cycle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useCycle = () => {
  const [cycle, setCycle] = useState<Cycle | undefined>(undefined);
  const pathname = usePathname()

  useEffect(() => {
    const fetchCycle = async () => {
      try {
        const res = await getLatestCycle()
        setCycle(res)
      } catch {
        setCycle(undefined)
      }
    }

    fetchCycle()

    return () => {
      setCycle(undefined)
    }
  }, [pathname])

  return cycle
}


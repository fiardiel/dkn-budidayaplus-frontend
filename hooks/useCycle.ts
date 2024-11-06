import { getLatestCycle } from "@/lib/cycle";
import { Cycle } from "@/types/cycle";
import { useEffect, useState } from "react";

export const useCycle = () => {
    const [cycle, setCycle] = useState<Cycle | undefined>(undefined);

    useEffect(() => {
        const fetchCycle = async () => {
            const cycle = await getLatestCycle();
            setCycle(cycle);
        }

        fetchCycle();

        return () => {
            setCycle(undefined);
        }
    }, [])

    return cycle
}
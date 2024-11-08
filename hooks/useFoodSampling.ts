import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCycle } from '@/hooks/useCycle';
import { getLatestFoodSampling } from '@/lib/food-sampling';
import { FoodSampling } from '@/types/food-sampling';

export const useFoodSampling = (pondId: string) => {
  const [foodSampling, setFoodSampling] = useState<FoodSampling | undefined>(undefined);
  const pathname = usePathname();
  const cycle = useCycle();

  useEffect(() => {
    const fetchFoodSampling = async () => {
      try {
        if (cycle) {
          const res = await getLatestFoodSampling(pondId, cycle.id);
          setFoodSampling(res);
        }
      } catch {
        setFoodSampling(undefined);
      }
    };

    fetchFoodSampling();
  }, [pondId, pathname, cycle]);

  return { foodSampling, cycle };
};

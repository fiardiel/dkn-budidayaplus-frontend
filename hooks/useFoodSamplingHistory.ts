import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCycle } from '@/hooks/useCycle';
import { getFoodSamplingHistory } from '@/lib/food-sampling';
import { FoodSamplingHistory } from '@/types/food-sampling';

export const useFoodSamplingHistory = (pondId: string) => {
  const [foodSamplingHistory, setFoodSamplingHistory] = useState<FoodSamplingHistory | undefined>(undefined);
  const pathname = usePathname();
  const cycle = useCycle();

  useEffect(() => {
    const fetchFoodSamplingHistory = async () => {
      try {
        if (cycle) {
          const history = await getFoodSamplingHistory(cycle.id, pondId);
          setFoodSamplingHistory(history);
        }
      } catch {
        setFoodSamplingHistory(undefined);
      }
    };

    fetchFoodSamplingHistory();

    return () => {
      setFoodSamplingHistory(undefined); 
    };
  }, [pondId, pathname, cycle]);

  return foodSamplingHistory;
};

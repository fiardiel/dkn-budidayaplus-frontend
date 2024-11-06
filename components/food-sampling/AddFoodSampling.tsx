'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FoodSamplingForm } from '@/components/food-sampling'
import { Cycle } from '@/types/cycle';
import { getLatestCycle } from '@/lib/cycle';

interface AddFoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
}


const AddFoodSampling: React.FC<AddFoodSamplingProps> = ({pondId, ...props}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  if (!cycle){
    return <p>Tidak dapat menambahkan sample makanan karena siklus belum ada</p>
  }
  return (
    <div {...props}>
      {cycle && (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex" data-testid="add-food-sampling-button">
            Add Food Sampling <IoIosAdd size={20} className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Add Food Sampling">
          <FoodSamplingForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycle.id} />
        </DialogContent>
      </Dialog>
      )}
    </div>
  );
};

export default AddFoodSampling;
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FoodSamplingForm }  from '@/components/food-sampling';

interface AddFoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  cycleId: string;
}


const AddFoodSampling: React.FC<AddFoodSamplingProps> = ({pondId, cycleId, ...props}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex text-sm" variant={'outline'} size={'sm'}>
            Add Food Sampling <IoIosAdd size={20} className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Add Food Sampling">
          <FoodSamplingForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycleId}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFoodSampling;
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FishSamplingForm }  from '@/components/fish-sampling';
import { FishSampling } from '@/types/fish-sampling';

interface AddFishSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
}


const AddFishSampling: React.FC<AddFishSamplingProps> = ({pondId, ...props}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex">
            Add Fish Sampling <IoIosAdd size={20} className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Add Fish Sampling">
          <FishSamplingForm setIsModalOpen={setIsModalOpen} pondId={pondId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFishSampling;
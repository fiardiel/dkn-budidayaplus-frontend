'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FishSamplingForm } from '@/components/fish-sampling';

interface AddFishSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  cycleId?: string;
}

const AddFishSampling: React.FC<AddFishSamplingProps> = ({ pondId, cycleId, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      {cycleId && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size={'sm'} className="flex" data-testid="add-fish-sampling-button">
              Sample <IoIosAdd size={20} className="ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent title="Add Fish Sampling">
            <FishSamplingForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycleId} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AddFishSampling;

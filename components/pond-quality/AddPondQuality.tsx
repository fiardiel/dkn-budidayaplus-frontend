'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PondQualityForm }  from '@/components/pond-quality';

interface AddPondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  cycleId: string;
}


const AddPondQuality: React.FC<AddPondQualityProps> = ({pondId, cycleId, ...props}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex text-sm" variant={'outline'} size={'sm'}>
            Sample<IoIosAdd size={20} className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Add Pond Quality">
          <PondQualityForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycleId}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPondQuality;

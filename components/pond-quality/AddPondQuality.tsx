'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { PondQualityForm }  from '@/components/pond-quality';
import { PondQuality } from '@/types/pond-quality';

interface AddPondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  pondQuality?: PondQuality;
}


const AddPondQuality: React.FC<AddPondQualityProps> = ({pondId, pondQuality, ...props}) =>  {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="flex">
            Add Pond Quality <IoIosAdd size={20} className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent title="Add Pond Quality">
          <PondQualityForm setIsModalOpen={setIsModalOpen} pondId={pondId} pondQuality={pondQuality}/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPondQuality;

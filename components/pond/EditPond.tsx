'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal as DialogContent } from '@/components/ui/modal';
import { PondForm } from '@/components/pond';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Pond } from '@/types/pond';
import { TbEdit } from "react-icons/tb";

interface EditPondProps extends React.HTMLAttributes<HTMLDivElement> {
  pond: Pond
}

const EditPond: React.FC<EditPondProps> = ({ pond, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className='flex gap-2'>
            Edit Kolam{' '}<TbEdit size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent title='Edit Kolam'>
          <PondForm pond={pond} setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPond;
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal as DialogContent } from '@/components/ui/modal';
import { PondForm } from '@/components/pond';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Pond } from '@/types/pond';
import { Pencil } from 'lucide-react';

interface EditPondProps extends React.HTMLAttributes<HTMLDivElement> {
  pond: Pond
}

const EditPond: React.FC<EditPondProps> = ({ pond, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className='bg-primary hover:bg-primary-400'>
            Edit <Pencil className='ml-2' size={18}/>
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
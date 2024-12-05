'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { PondForm } from '@/components/pond';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';


const AddPond: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className='flex bg-blue-500 hover:bg-blue-500'>
            Tambah Kolam{' '}<IoIosAdd size={20} className='ml-1' />
          </Button>
        </DialogTrigger>
        <DialogContent title='Tambah Kolam'>
          <PondForm setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPond;

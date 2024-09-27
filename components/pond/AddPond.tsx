'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addPond } from '@/lib/pond';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '@/components/ui/modal';
import { PondForm } from '@/components/pond';
import { PondInputForm } from '@/types/pond';


const AddPond: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PondInputForm) => {
    try {
      await addPond(data);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create pond:', error);
      setError('Failed to create pond');
    }
  };

  return (
    <div {...props}>
      <Button className='flex' onClick={() => setOpen(true)}>
        Tambah Kolam{' '}<IoIosAdd size={20} className='ml-1' />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
          <PondForm onSubmit={onSubmit} buttonText="Submit" />
          {error && <p className='text-red-500'>{error}</p>}
      </Modal>
  </div>
  );
};

export default AddPond;
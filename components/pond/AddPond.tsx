'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { addPond } from '@/lib/pond';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '../ui/modal';
import PondForm from './PondForm';
import { PondInputForm } from '@/types/pond/inputpond';

interface AddPondProps extends React.HTMLProps<HTMLDivElement> {
  token?: string;
}

const AddPond: React.FC<AddPondProps> = ({ token: propToken, ...props }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PondInputForm) => {
    if (!propToken) {
      console.error('No token found');
      setError('No token found');
      return;
    }

    try {
      await addPond(data, propToken);
      setOpen(false);
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
        <div role="dialog">
          <PondForm onSubmit={onSubmit} buttonText="Submit" />
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default AddPond;
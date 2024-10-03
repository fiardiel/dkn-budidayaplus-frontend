'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addFishSampling } from '@/lib/fish_sampling';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '@/components/ui/modal';
import { FishSamplingInputForm } from '@/types/fish_sampling';
import { FishSamplingForm } from '@/components/fish_sampling';

interface AddFishSamplingProps extends React.HTMLProps<HTMLDivElement> {
  token?: string;
}

const AddFishSampling: React.FC<AddFishSamplingProps> = ({ token: propToken, ...props }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FishSamplingInputForm) => {
    if (!propToken) {
      console.error('No token found');
      setError('No token found');
      return;
    }

    try {
      await addFishSampling(data, propToken);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to create fish sampling:', error);
      setError('Failed to create fish sampling');
    }
  };

  return (
    <div {...props}>
      <Button className='flex' onClick={() => setOpen(true)}>
        Tambah Sampling Ikan{' '}<IoIosAdd size={20} className='ml-1' />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
          <FishSamplingForm onSubmit={onSubmit} buttonText="Submit" ponds={[]} />
          {error && <p className='text-red-500'>{error}</p>}
      </Modal>
  </div>
  );
};

export default AddFishSampling;
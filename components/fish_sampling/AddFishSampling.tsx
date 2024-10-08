'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addFishSampling } from '@/lib/fish_sampling';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '@/components/ui/modal';
import { FishSamplingInputForm } from '@/types/fish_sampling';
import { FishSamplingForm } from '@/components/fish_sampling';
import { Pond } from '@/types/pond';

interface AddFishSamplingProps extends React.HTMLProps<HTMLDivElement> {
  token?: string;
  pondData: Pond;
}

const AddFishSampling: React.FC<AddFishSamplingProps> = ({ token: propToken, pondData, ...props }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FishSamplingInputForm) => {
    // Check if the token is available
    if (!propToken) {
      console.error('No token found');
      setError('Authentication token is missing. Please log in.');
      return; // Exit the function if there's no token
    }

    try {
      // Attempt to add fish sampling
      await addFishSampling(pondData.pond_id, data, propToken);
      setOpen(false); // Close modal on success
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Failed to create fish sampling:', error);
      setError('Failed to create fish sampling. Please try again.'); // Set user-friendly error message
    }
  };

  return (
    <div {...props}>
      <Button className='flex' onClick={() => setOpen(true)}>
        Tambah Sampling Ikan{' '}<IoIosAdd size={20} className='ml-1' />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div role="dialog" aria-modal="true" className="bg-white rounded-lg p-6 max-w-lg w-full">
          <FishSamplingForm onSubmit={onSubmit} buttonText="Submit" />
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </Modal>
  </div>
  );
};

export default AddFishSampling;
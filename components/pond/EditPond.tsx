'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { updatePond } from '@/lib/pond';
import { IoIosSave } from 'react-icons/io';
import { Modal } from '@/components/ui/modal';
import { Pond } from '@/types/pond';
import { PondForm } from '@/components/pond';
import { PondInputForm } from '@/types/pond';

interface EditPondProps extends React.HTMLProps<HTMLDivElement> {
  token?: string;
  pondData: Pond;
}

const EditPond: React.FC<EditPondProps> = ({ token: propToken, pondData, ...props }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: PondInputForm) => {
    if (!propToken) {
      console.error('No token found');
      setError('No token found');
      return;
    }

    try {
      await updatePond(pondData.pond_id, data, propToken);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to update pond:', error);
      setError('Failed to update pond');
    }
  };

  return (
    <div {...props}>
      <Button className='flex' onClick={() => setOpen(true)}>
        Edit Kolam{' '}<IoIosSave size={20} className='ml-1' />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div role="dialog">
          <PondForm onSubmit={onSubmit} initialData={pondData} buttonText="Save Changes" />
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default EditPond;
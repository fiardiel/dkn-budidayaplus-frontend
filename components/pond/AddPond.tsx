'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { PondAddSchema, PondAddForm } from '@/types/pond/addpond';
import { addPond } from '@/lib/pond';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '../ui/modal';

interface AddPondProps extends React.HTMLProps<HTMLDivElement> {
  token?: string 
}

const AddPond: React.FC<AddPondProps> = ({ token: propToken, ...props }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PondAddForm>({
    resolver: zodResolver(PondAddSchema),
  });

  const onSubmit = async (data: PondAddForm) => {
    if (!propToken) {
      console.error('No token found');
      setError('No token found');
      return;
    }
    console.log('Submitting data', data);  // <-- Add this

    try {
      setLoading(true);
      const response = await addPond(data, propToken);
      console.log('Pond created:', response);
      reset();
      setOpen(false);
      console.log('Modal closed')
    } catch (error) {
      console.error('Failed to create pond:', error);
      setError('Failed to create pond');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div {...props}>
      <Button className='flex' onClick={() => setOpen(true)}>
        Tambah Kolam{' '}<IoIosAdd size={20} className='ml-1' />
      </Button>

      <Modal open={open} onClose={() => setOpen(false) }>
        <div role="dialog">
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <input
            {...register('name')}
            placeholder='Nama Kolam'
            className='w-full p-3 border border-gray-300 rounded-lg'
          />
          {errors.name && <p className='text-red-500'>{errors.name.message?.toString()}</p>}

          <input
            {...register('image_name')}
            placeholder='Nama Gambar'
            className='w-full p-3 border border-gray-300 rounded-lg'
          />
          {errors.image_name && <p className='text-red-500'>{errors.image_name.message?.toString()}</p>}

          <input
          type='number'
          {...register('volume', {
            setValueAs: value => parseFloat(value), 
          })}
          placeholder='Volume Kolam'
          className='w-full p-3 border border-gray-300 rounded-lg'
          />
          {errors.volume && <p className='text-red-500'>{errors.volume.message?.toString()}</p>}

          {error && <p className='text-red-500'>{error}</p>}

          <Button type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddPond;

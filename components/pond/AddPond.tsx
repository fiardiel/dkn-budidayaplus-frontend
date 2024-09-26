'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { PondAddSchema, PondAddForm } from '@/types/pond/addpond';
import { addPond } from '@/lib/pond';
import { IoIosAdd } from 'react-icons/io';
import { Modal } from '../ui/modal';

interface AddPondProps extends React.HTMLProps<HTMLDivElement> {
  token?: string;
}

const AddPond: React.FC<AddPondProps> = ({ token: propToken, ...props }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState<number | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<PondAddForm>({
    resolver: zodResolver(PondAddSchema),
  });

  // Watch length, width, and height to calculate volume
  const length = watch('length');
  const width = watch('width');
  const height = watch('height');

  useEffect(() => {
    if (length && width && height) {
      const calculatedVolume = parseFloat(length.toString()) * parseFloat(width.toString()) * parseFloat(height.toString());
      setVolume(calculatedVolume);
      setValue('volume', calculatedVolume); // Set the calculated volume to the form
    }
  }, [length, width, height, setValue]);

  const onSubmit = async (data: PondAddForm) => {
    if (!propToken) {
      console.error('No token found');
      setError('No token found');
      return;
    }
    console.log('Submitting data', data);

    try {
      setLoading(true);
      const response = await addPond(data, propToken);
      console.log('Pond created:', response);
      reset();
      setOpen(false);
      console.log('Modal closed');
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

      <Modal open={open} onClose={() => setOpen(false)}>
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
              {...register('length', {
                setValueAs: value => parseFloat(value),
              })}
              placeholder='Panjang (meter)'
              type='number'
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.length && <p className='text-red-500'>{errors.length.message?.toString()}</p>}

            <input
              {...register('width', {
                setValueAs: value => parseFloat(value),
              })}
              placeholder='Lebar (meter)'
              type='number'
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.width && <p className='text-red-500'>{errors.width.message?.toString()}</p>}

            <input
              {...register('height', {
                setValueAs: value => parseFloat(value),
              })}
              placeholder='Tinggi (meter)'
              type='number'
              className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.height && <p className='text-red-500'>{errors.height.message?.toString()}</p>}

            {volume !== null && (
              <p className="text-gray-700">
                Volume Kolam: {volume.toFixed(2)} meter^3
              </p>
            )}

            <input
              type="hidden"
              {...register('volume', { valueAsNumber: true })}
            />

            {error && <p className='text-red-500'>{error}</p>}

            <Button type='submit'>
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddPond;

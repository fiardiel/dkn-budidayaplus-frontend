'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { PondInputSchema, PondInputForm } from '@/types/pond';

interface PondFormProps {
    onSubmit: (data: PondInputForm) => Promise<void>;
    initialData?: PondInputForm;
    buttonText: string;
}

const PondForm: React.FC<PondFormProps> = ({ onSubmit, initialData, buttonText }) => {
    const [volume, setVolume] = useState<number | null>(null)
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PondInputForm>({
        resolver: zodResolver(PondInputSchema),
        defaultValues: initialData,
    });

    const length = watch('length');
    const width = watch('width');
    const height = watch('depth');

    useEffect(() => {
        if (length && width && height) {
            const calculatedVolume = parseFloat(length.toString()) * parseFloat(width.toString()) * parseFloat(height.toString());
            setVolume(calculatedVolume);
        }
    }, [length, width, height, setValue]);

    return (
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
                {...register('length', { setValueAs: value => parseFloat(value) })}
                placeholder='Panjang (meter)'
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.length && <p className='text-red-500'>{errors.length.message?.toString()}</p>}

            <input
                {...register('width', { setValueAs: value => parseFloat(value) })}
                placeholder='Lebar (meter)'
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.width && <p className='text-red-500'>{errors.width.message?.toString()}</p>}

            <input
                {...register('depth', { setValueAs: value => parseFloat(value) })}
                placeholder='Kedalaman (meter)'
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.depth && <p className='text-red-500'>{errors.depth.message?.toString()}</p>}

            {volume !== null && (
                <p className="text-gray-700">
                    Volume Kolam: {volume.toFixed(2)} m^3
                </p>
            )}

            <Button type='submit'>{buttonText}</Button>
        </form>
    );
};

export default PondForm;
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FishSamplingInputSchema, FishSamplingInputForm } from '@/types/fish_sampling';
import { Pond } from '@/types/pond'; 

interface FishSamplingFormProps {
    onSubmit: (data: FishSamplingInputForm) => Promise<void>;
    initialData?: FishSamplingInputForm;
    buttonText: string;
    ponds: Pond[];
}

const FishSamplingForm: React.FC<FishSamplingFormProps> = ({ onSubmit, initialData, buttonText, ponds }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FishSamplingInputForm>({
        resolver: zodResolver(FishSamplingInputSchema),
        defaultValues: initialData,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

            <input
                {...register('fish_weight', { 
                    setValueAs: value => parseFloat(value), 
                })}
                placeholder='Berat Ikan (kg)'
                type='number'
                step='0.01'
                className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.fish_weight && <p className='text-red-500'>{errors.fish_weight.message?.toString()}</p>}

            <input
                {...register('fish_length', { 
                    setValueAs: value => parseFloat(value), 
                })}
                placeholder='Panjang Ikan (cm)'
                type='number'
                step='0.1'
                className='w-full p-3 border border-gray-300 rounded-lg'
            />
            {errors.fish_length && <p className='text-red-500'>{errors.fish_length.message?.toString()}</p>}

            <Button type='submit'>{buttonText}</Button>
        </form>
    );
};

export default FishSamplingForm;


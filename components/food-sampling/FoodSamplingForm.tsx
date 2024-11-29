'use client';

import { FoodSamplingInput, FoodSamplingSchema } from '@/types/food-sampling';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addFoodSampling } from '@/lib/food-sampling';

interface FoodSamplingFormProps {
  setIsModalOpen: (open: boolean) => void
  pondId: string
  cycleId: string
}

const FOOD_QUANTITY_THRESHOLD = 1000;

const FoodSamplingForm: React.FC<FoodSamplingFormProps> = ({ pondId, cycleId, setIsModalOpen }) => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FoodSamplingInput>({
    resolver: zodResolver(FoodSamplingSchema),
    defaultValues: {
      food_quantity: 0
    }
  });

  const foodQuantity = watch('food_quantity');

  const onSubmit = async (data: FoodSamplingInput) => {
    try {
      setError(null);
      const res = await addFoodSampling(data, pondId, cycleId);

      if (!res.success) {
        console.log(res.message);
        setError('Gagal menyimpan sample makanan');
        return;
      }

      reset();
      setIsModalOpen(false);
      window.location.reload();

    } catch (error) {
      setError('Gagal menyimpan sample makanan');
    }
  };

  return (
    <div>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="col-span-2">
          <Input
            {...register('food_quantity', { setValueAs: value => parseInt(value) })}
            type="number"
            placeholder="Kuantitas Makanan"
            className={foodQuantity > FOOD_QUANTITY_THRESHOLD ? 'text-red-500' : ''}
          />
          {errors.food_quantity && <span>{errors.food_quantity.message}</span>}
        </div>

        <Button
          className="w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 col-span-2"
          type="submit"
          disabled={isSubmitting}
        >
          Simpan
        </Button>

        {error && <p className="w-full text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default FoodSamplingForm;

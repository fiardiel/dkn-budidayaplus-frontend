'use client';

import { FishSamplingInputForm, FishSamplingSchema  } from '@/types/fish-sampling';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addFishSampling } from '@/lib/fish-sampling';
import { objectToFormData } from '@/lib/utils'

interface FishSamplingFormProps {
  setIsModalOpen: (open: boolean) => void
  pondId: string
  cycleId: string
}

const FishSamplingForm: React.FC<FishSamplingFormProps> = ({pondId, cycleId, setIsModalOpen }) => {
    const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FishSamplingInputForm>({
    resolver: zodResolver(FishSamplingSchema)
  })

  const onSubmit = async (data: FishSamplingInputForm) => {
    try {
      setError(null)
      const fishSamplingData = objectToFormData(data)
      const res = await addFishSampling(pondId, cycleId, fishSamplingData)

      if (!res.success) {
        setError('Gagal menyimpan sample ikan')
        return
      }

      reset()
      setIsModalOpen(false)
      window.location.reload()

    } catch(error) {
      setError('Gagal menyimpan sample ikan')
    }
  }

  return (
    <div>
       <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit(onSubmit)}> 

            <div>
             <Input
               {...register('fish_weight', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Berat Ikan(kg)"
               step={0.01}
             />
             {errors.fish_weight && <span>{errors.fish_weight.message}</span>}
            </div>

            <div>
             <Input
               {...register('fish_length', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Panjang Ikan(cm)"
               step={0.01}
             />
             {errors.fish_length && <span>{errors.fish_length.message}</span>}
            </div>
   
            <Button className='w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700' type='submit' disabled={isSubmitting}>
          Simpan
        </Button>
        {error && <p className='w-full text-center text-red-500'>{error}</p>}
       </form>
    </div>
  );
};

export default FishSamplingForm;
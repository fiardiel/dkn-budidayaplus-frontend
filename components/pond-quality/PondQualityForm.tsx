'use client';

import { PondQuality, PondQualityInput, PondQualitySchema  } from '@/types/pond-quality';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addOrUpdatePondQuality } from '@/lib/pond-quality';
import { objectToFormData } from '@/lib/utils'

interface PondQualityFormProps {
  setIsModalOpen: (open: boolean) => void
  pondQuality?: PondQuality
  pondId?: string
  
}

const PondQualityForm: React.FC<PondQualityFormProps> = ({pondId, pondQuality, setIsModalOpen }) => {
    const [error, setError] = useState<string | null>(null)

  
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,

} = useForm<PondQualityInput>({
    resolver: zodResolver(PondQualitySchema),
    defaultValues: pondQuality && {
        ph_level: pondQuality.ph_level,
        salinity: pondQuality.salinity, 
        water_temperature: pondQuality.water_temperature,
        water_clarity: pondQuality.water_clarity,
        water_circulation: pondQuality.water_circulation,
        dissolved_oxygen: pondQuality.dissolved_oxygen,
        orp: pondQuality.orp,
        ammonia: pondQuality.ammonia,
        nitrate: pondQuality.nitrate,
        phosphate: pondQuality.phosphate,
    }
  });

  const onSubmit = async (data: PondQualityInput) => {
    try {
      setError(null)
      const imageList = data.image as FileList
      data.image = imageList[0]
      const formQualityData = objectToFormData(data)

      const res = await addOrUpdatePondQuality(formQualityData, pondId)

      if (!res.success) {
        setError('Gagal menyimpan kualitas air')
        return
      }

      reset()
      setIsModalOpen(false)
      window.location.reload()

    } catch(error) {
      setError('Gagal menyimpan kualitas air')
    }
  }

  return (
    <div>
       <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit(onSubmit)}> 

            <div>
             <Input
               {...register('water_temperature', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Temperatur Air"
               step={0.01}
             />
             {errors.water_temperature && <span>{errors.water_temperature.message}</span>}
            </div>

            <div>
             <Input
               {...register('ph_level', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Level pH"
               step={0.01}
             />
             {errors.ph_level && <span>{errors.ph_level.message}</span>}
            </div>

            <div>
             <Input
               {...register('salinity', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Salinitas"
               step={0.01}
             />
             {errors.salinity && <span>{errors.salinity.message}</span>}
             </div>

            <div>
             <Input
               {...register('water_clarity', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Kejernihan Air"
               step={0.01}
             />
             {errors.water_clarity && <span>{errors.water_clarity.message}</span>}
            </div>

            <div>
             <Input
               {...register('water_circulation', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Sirkulasi Air"
               step={0.01}
             />
             {errors.water_circulation && <span>{errors.water_circulation.message}</span>}
            </div>

            <div>
             <Input
               {...register('dissolved_oxygen', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Oksigen Terlarut"
               step={0.01}
             />
             {errors.dissolved_oxygen && <span>{errors.dissolved_oxygen.message}</span>}
            </div>

            <div>
             <Input
               {...register('orp', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="ORP"
               step={0.01}
             />
             {errors.orp && <span>{errors.orp.message}</span>}
            </div>

            <div>
             <Input
               {...register('ammonia', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Ammonia"
               step={0.01}
             />
             {errors.ammonia && <span>{errors.ammonia.message}</span>}
            </div>

            <div>
             <Input
               {...register('nitrate', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Nitrate"
               step={0.01}
             />
             {errors.nitrate && <span>{errors.nitrate.message}</span>}
            </div>

            <div>
             <Input
               {...register('phosphate', { setValueAs: value => parseFloat(value) })}
               type="number"
               placeholder="Phosphate"
               step={0.01}
             />
             {errors.phosphate && <span>{errors.phosphate.message}</span>}
            </div>

            <div>
             <Input
               {...register('image')}
               type="file"
               accept="image/*"
               data-testid="image"
             />
            </div>
   
            <Button className='w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700' type='submit' disabled={isSubmitting}>
          Simpan
        </Button>
        {error && <p className='w-full text-center text-red-500'>{error}</p>}
       </form>
    </div>
  );
};

export default PondQualityForm;

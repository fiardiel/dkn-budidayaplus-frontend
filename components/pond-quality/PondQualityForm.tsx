'use client';

import { PondQualityInput, PondQualitySchema } from '@/types/pond-quality';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addOrUpdatePondQuality } from '@/lib/pond-quality';
import { objectToFormData } from '@/lib/utils'
import { Label } from '@radix-ui/react-label';

interface PondQualityFormProps {
  setIsModalOpen: (open: boolean) => void
  pondId?: string
  cycleId?: string
}

const PondQualityForm: React.FC<PondQualityFormProps> = ({ pondId, cycleId, setIsModalOpen }) => {
  const [error, setError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PondQualityInput>({
    resolver: zodResolver(PondQualitySchema),
    defaultValues: {
      ph_level: 0,
      salinity: 0,
      water_temperature: 0,
      water_clarity: 0,
      water_circulation: 0,
      dissolved_oxygen: 0,
      orp: 0,
      ammonia: 0,
      nitrate: 0,
      phosphate: 0,
    }
  });

  const reloadPage = () => {
    window.location.reload();
  };

  const onSubmit = async (data: PondQualityInput) => {
    try {
      setError(null)
      const imageList = data.image as FileList
      data.image = imageList[0]
      const formQualityData = objectToFormData(data)

      const res = await addOrUpdatePondQuality(formQualityData, pondId, cycleId)

      if (!res.success) {
        setError('Gagal menyimpan kualitas air')
        return
      }

      reset()
      setIsModalOpen(false)
      reloadPage()

    } catch (error) {
      setError('Gagal menyimpan kualitas air')
    }
  }

  return (
    <div>
      <form className='grid grid-cols-2 gap-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label className='text-sm' htmlFor='water_temperature'>
            Temperatur (°C)
          </Label>
          <Input
            {...register('water_temperature', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Temperatur Air"
            step={0.01}
          />
          {errors.water_temperature && <span className='text-sm text-red-500'>{errors.water_temperature.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='ph_level'>
            pH (0-14)
          </Label>
          <Input
            {...register('ph_level', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Level pH"
            step={0.01}
          />
          {errors.ph_level && <span className='text-sm text-red-500'>{errors.ph_level.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='salinity'>
            Salinitas (PSU)
          </Label>
          <Input
            {...register('salinity', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Salinitas"
            step={0.01}
          />
          {errors.salinity && <span className='text-sm text-red-500'>{errors.salinity.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='water_clarity'>
            Kejernihan Air (NTU)
          </Label>
          <Input
            {...register('water_clarity', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Kejernihan Air"
            step={0.01}
          />
          {errors.water_clarity && <span className='text-sm text-red-500'>{errors.water_clarity.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='water_circulation'>
            Sirkulasi Air (L/menit)
          </Label>
          <Input
            {...register('water_circulation', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Sirkulasi Air"
            step={0.01}
          />
          {errors.water_circulation && <span className='text-sm text-red-500'>{errors.water_circulation.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='dissolved_oxygen'>
            Oksigen Terlarut (mg/L)
          </Label>
          <Input
            {...register('dissolved_oxygen', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Oksigen Terlarut"
            step={0.01}
          />
          {errors.dissolved_oxygen && <span className='text-sm text-red-500'>{errors.dissolved_oxygen.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='orp'>
            ORP (mV)
          </Label>
          <Input
            {...register('orp', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="ORP"
            step={0.01}
          />
          {errors.orp && <span className='text-sm text-red-500'>{errors.orp.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='ammonia'>
            Ammonia (mg/L)
          </Label>
          <Input
            {...register('ammonia', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Ammonia"
            step={0.01}
          />
          {errors.ammonia && <span className='text-sm text-red-500'>{errors.ammonia.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='nitrate'>
            Nitrate (mg/L)
          </Label>
          <Input
            {...register('nitrate', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Nitrate"
            step={0.01}
          />
          {errors.nitrate && <span className='text-sm text-red-500'>{errors.nitrate.message}</span>}
        </div>

        <div>
          <Label className='text-sm' htmlFor='phosphate'>
            Phosphate (mg/L)
          </Label>
          <Input
            {...register('phosphate', { setValueAs: value => parseFloat(value) })}
            type="number"
            placeholder="Phosphate"
            step={0.01}
          />
          {errors.phosphate && <span className='text-sm text-red-500'>{errors.phosphate.message}</span>}
        </div>

        <div className='col-span-2'>
          <Input
            {...register('image')}
            type="file"
            accept="image/*"
            data-testid="image"
          />
        </div>

        <Button className='w-full bg-primary-500 hover:bg-primary-600 active:bg-primary-700 col-span-2' type='submit' disabled={isSubmitting}>
          Simpan
        </Button>
        {error && <p className='w-full text-center text-red-500 col-span-2'>{error}</p>}
      </form>
    </div>
  );
};

export default PondQualityForm;

'use client'

import { Pond, PondInput, PondInputSchema } from '@/types/pond'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { objectToFormData } from '@/lib/utils'
import { addOrUpdatePond } from '@/lib/pond'

interface PondFormProps {
  pond?: Pond
  setIsModalOpen: (open: boolean) => void
}

const PondForm: React.FC<PondFormProps> = ({ pond, setIsModalOpen }) => {
  const [volume, setVolume] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm<PondInput>({
    resolver: zodResolver(PondInputSchema),
    defaultValues: pond && {
      name: pond.name,
      length: pond.length,
      width: pond.width,
      depth: pond.depth,
    }
  })

  const width = watch('width')
  const length = watch('length')
  const depth = watch('depth')

  const onSubmit = async (data: PondInput) => {
    try {
      setError(null)
      const imageList = data.image as FileList
      data.image = imageList[0]
      const formData = objectToFormData(data)

      const res = await addOrUpdatePond(formData, pond?.pond_id)

      if (!res.success) {
        setError('Gagal menyimpan kolam')
        return
      }

      reset()
      setIsModalOpen(false)
      window.location.reload()

    } catch (error) {
      setError('Gagal menyimpan kolam')
    }
  }

  useEffect(() => {
    if (width && length && depth) {
      setVolume(width * length * depth)
    }
    return () => { return setVolume(null) }
  }, [width, length, depth])

  return (
    <div>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register('name')}
            placeholder='Nama Kolam'
            className='h-12'
          />
          {errors.name && <p className='text-red-500 mt-1 text-sm'>{errors.name.message?.toString()}</p>}
        </div>

        <div>
          <Input
            {...register('length', { setValueAs: value => parseFloat(value) })}
            placeholder='Panjang (meter)'
            className='h-12'
            step={0.01}
          />
          {errors.length && <p className='text-red-500 mt-1 text-sm'>{errors.length.message?.toString()}</p>}
        </div>

        <div>
          <Input
            {...register('width', { setValueAs: value => parseFloat(value) })}
            placeholder='Lebar (meter)'
            className='h-12'
            step={0.01}
          />
          {errors.width && <p className='text-red-500 mt-1 text-sm'>{errors.width.message?.toString()}</p>}
        </div>

        <div>
          <Input
            {...register('depth', { setValueAs: value => parseFloat(value) })}
            placeholder='Kedalaman (meter)'
            className='h-12'
            step={0.01}
          />
          {errors.depth && <p className='text-red-500 mt-1 text-sm'>{errors.depth.message?.toString()}</p>}
        </div>

        <div>
          <Input
            {...register('image')}
            data-testid='image'
            type='file'
            accept='image/*'
          />
        </div>

        {volume && <p className='text-center font-semibold'>Volume: {volume.toFixed(2)} m<sup>3</sup></p>}

        <Button className='w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700' type='submit' disabled={isSubmitting}>
          Simpan
        </Button>

        {error && <p className='w-full text-center text-red-500'>{error}</p>}
      </form>

    </div>
  )
}

export default PondForm

'use client'

import { Profile, UpdateProfileInput, UpdateProfileSchema } from '@/types/profile'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/lib/profile'

interface UpdateProfileFormProps extends React.HTMLAttributes<HTMLDivElement>{
  setIsModalOpen: (open: boolean) => void
  profile?: Profile
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({profile, setIsModalOpen, ...props}) => {
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: profile && {
        first_name: profile.user.first_name,
        last_name: profile.user.last_name
      }
  })

  const onSubmit = async (data: UpdateProfileInput) => {
    try {
      await updateProfile(data)
      reset()
      setIsModalOpen(false)
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <div {...props}>
      <div className='flex gap-6'>
        <div className='w-24 h-24'>
          <Image
            src={'/fallbackimage.png'}
            width={500}
            height={500}
            alt='Profile Image'
            className='rounded-full h-full object-cover'
          />
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <Button size={'sm'} className='bg-blue-500 hover:bg-blue-600/90' disabled>
            Ganti foto
          </Button>
          <Button size={'sm'} variant={'outline'} className='border-red-500/40 text-red-500 hover:text-red-600 hover:bg-red-50' disabled>
            Hapus foto
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
        <div className='flex flex-col'>
          <div className='flex flex-col sm:grid sm:grid-cols-2 gap-2'>
            <div className='space-y-1'>
              <Label htmlFor='firstName'>Nama Depan</Label>
              <Input
                {...register('first_name')}
                placeholder='Nama Depan'
                type='text'
                id='firstName'
              />
              {errors.first_name && <p className='text-red-500 text-sm'>{errors.first_name.message}</p>}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='lastName'>Nama Belakang</Label>
              <Input
                {...register('last_name')}
                placeholder='Nama Belakang'
                type='text'
                id='lastName'
              />
              {errors.last_name && <p className='text-red-500 text-sm'>{errors.last_name.message}</p>}
            </div>
          </div>
          <Button type='submit' className='mt-5' disabled={isSubmitting}>
            Simpan
          </Button>
          {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileForm

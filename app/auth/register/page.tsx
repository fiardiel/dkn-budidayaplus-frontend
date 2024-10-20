'use client'

import React, { useState } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { handleRegisterSubmit } from '@/lib/auth'
import { RegisterForm, registerSchema } from '@/types/auth/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError(null)
      const response = await handleRegisterSubmit(data)

      if (!response.ok) {
        return setError(response.message)
      }

      reset()
      router.push('/')
    } catch {
      setError("Terjadi kesalahan pada registrasi")
    }
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-[100dvh]'>
        <div className='w-[80%]'>
          <div className='flex flex-col items-center'>
            <p className='text-4xl font-bold text-center'>Registrasi akun</p>
            <p className='text-3xl mt-1'>Budidaya<span className='text-blue-500'>Plus</span></p>
          </div>
          <form data-testid='register-form' onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full mt-5'>
            <div className='flex flex-col'>
              <Input
                className={cn('border-none h-12 mt-3 focus-visible:ring-blue-500 placeholder:text-black', error ? 'bg-red-100 ring-2 ring-red-200' : 'bg-blue-50')} 
                type='text'
                placeholder='Nomor Ponsel'
                {...register('phone_number')}
              />
              {errors.phone_number && <span className='text-sm text-red-500 mt-1'>{errors.phone_number.message}</span>}
              <Input
                className='border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black'
                type='text'
                placeholder='Nama Depan'
                {...register('first_name')}
              />
              {errors.first_name && <span className='text-sm text-red-500 mt-1'>{errors.first_name.message}</span>}
              <Input
                className='border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black'
                type='text'
                placeholder='Nama Belakang'
                {...register('last_name')}
              />
              {errors.last_name && <span className='text-sm text-red-500 mt-1'>{errors.last_name.message}</span>}
              <Input
                className='border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black'
                type='password'
                placeholder='Kata Sandi'
                {...register('password')}
              />
              {errors.password && <span className='text-sm text-red-500 mt-1'>{errors.password.message}</span>}
              <Button data-testid='register-button' className='mt-10 h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700' type='submit' disabled={isSubmitting} >
                {
                  isSubmitting ? (
                    <LoadingSpinner className='h-5 w-5'/>
                  ) :
                  'Daftar'
                }
              </Button>
              {error && <p className='text-red-500 font-semibold text-sm self-center mt-2'>{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

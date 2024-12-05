'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/LoadingSpinner'
import { cn } from '@/lib/utils'
import { RegisterForm, registerSchema } from '@/types/auth/register'

interface RegisterFormProps {
  onSubmit: (data: RegisterForm, reset: () => void, setError: React.Dispatch<React.SetStateAction<string | null>>) => Promise<void>;
}

const ReusableRegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const [error, setError] = React.useState<string | null>(null)

  const handleFormSubmit = async (data: RegisterForm) => {
    await onSubmit(data, reset, setError)
  }

  return (
    <form
      data-testid="register-form"
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col w-full mt-5"
    >
      <div className="flex flex-col">
        <Input
          className={cn(
            'border-none h-12 mt-3 focus-visible:ring-blue-500 placeholder:text-black',
            error ? 'bg-red-100 ring-2 ring-red-200' : 'bg-blue-50',
          )}
          type="text"
          placeholder="Nomor Ponsel"
          {...register('phone_number')}
        />
        {errors.phone_number && (
          <span className="text-sm text-red-500 mt-1">{errors.phone_number.message}</span>
        )}
        <Input
          className="border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black"
          type="text"
          placeholder="Nama Depan"
          {...register('first_name')}
        />
        {errors.first_name && (
          <span className="text-sm text-red-500 mt-1">{errors.first_name.message}</span>
        )}
        <Input
          className="border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black"
          type="text"
          placeholder="Nama Belakang"
          {...register('last_name')}
        />
        {errors.last_name && (
          <span className="text-sm text-red-500 mt-1">{errors.last_name.message}</span>
        )}
        <Input
          className="border-none h-12 bg-blue-50 mt-3 focus-visible:ring-blue-500 placeholder:text-black"
          type="password"
          placeholder="Kata Sandi"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
        )}
        <Button
          data-testid="register-button"
          className="mt-10 h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner className="h-5 w-5" /> : 'Daftar'}
        </Button>
        {error && (
          <p className="text-red-500 font-semibold text-sm self-center mt-2">{error}</p>
        )}
      </div>
    </form>
  )
}

export default ReusableRegisterForm


'use client'

import React, { useState } from 'react'
import { ReusableRegisterForm } from '@/components/profile'
import { RegisterForm } from '@/types/auth/register'
import { createWorker } from '@/lib/profile'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { UserRoundPlus } from 'lucide-react'

interface CreateWorkerAccountProps extends React.HTMLAttributes<HTMLDivElement> {
}

const CreateWorkerAccount: React.FC<CreateWorkerAccountProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false)

  const { toast } = useToast()

  const onSubmit = async (data: RegisterForm, reset: () => void, setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    const result = await createWorker(data)
    if (result.data) {
      toast({
        title: 'Berhasil',
        description: `Berhasil membuat akun untuk pekerja ${result.data.user.phone_number}`,
        variant: 'success'
      })
      setOpen(false)
      reset()
    } else {
      setError(result.error)
    }
  }

  return (
    <div {...props}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-600'>
            Buat Akun Pekerja <UserRoundPlus className='inline-block w-5 h-5 ml-2' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Registrasi Pekerja
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div>
            <ReusableRegisterForm onSubmit={onSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateWorkerAccount

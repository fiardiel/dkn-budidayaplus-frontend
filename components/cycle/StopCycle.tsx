'use client'

import React from 'react'
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Modal as DialogContent } from '@/components/ui/modal'
import { stopCycle } from '@/lib/cycle'
import { Ban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface StopCycleButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  cycleId: string
}

const StopCycle: React.FC<StopCycleButtonProps> = ({ cycleId, ...props }) => {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const handleStop = async () => {
    try {
      setLoading(true)
      const res = await stopCycle(cycleId)
      if (res.success) {
        toast({
          description: 'Siklus berhasil dihentikan',
          variant: 'success'
        })
      } else {
        toast({
          title: 'Gagal menghentikan siklus',
          description: 'Silakan coba lagi.',
          variant: 'destructive'
        })
      }
    } catch {
      toast({
        title: 'Gagal menghentikan siklus',
        description: 'Silakan coba lagi.',
        variant: 'destructive'
      })
    } finally {
      setModalOpen(false)
      setLoading(false)
    }
  }

  return (
    <div {...props}>
      <Dialog modal open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className='rounded-full' size='sm' variant={'destructive'}>
            Stop Siklus <Ban className='ml-2' size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:justify-start' title='Hentikan siklus' description='Apakah anda yakin ingin menghentikan siklus ini?'>
          <Button variant={'destructive'} onClick={handleStop} disabled={loading}>
            Konfirmasi
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StopCycle

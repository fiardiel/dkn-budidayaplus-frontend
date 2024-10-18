'use client'

import React, { useState } from 'react'
import AddCycleForm from '@/components/cycle/AddCycleForm'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'
import { Modal as DialogContent } from '@/components/ui/modal'
import { usePondList } from '@/hooks/usePondList';

interface AddCycleModalProps extends React.HTMLAttributes<HTMLDivElement> {
}

const AddCycleModal: React.FC<AddCycleModalProps> = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { pondList, error } = usePondList()

  return (
    <div {...props}>
      {error || pondList.length === 0 ?
        (
          <p className='text-center text-gray-500'>Tidak ada kolam yang tersedia</p>
        ) :
        (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} modal={false}>
            <DialogTrigger asChild>
              <Button>
                Mulai Siklus
              </Button>
            </DialogTrigger>
            <DialogContent title='Mulai Siklus'>
              <AddCycleForm pondList={pondList} setIsModalOpen={setIsModalOpen} />
            </DialogContent>
          </Dialog>
        )}
    </div>
  )
}

export default AddCycleModal

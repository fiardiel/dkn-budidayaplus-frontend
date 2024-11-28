'use client'

import React, { useState } from 'react'
import { AddCycleForm } from '@/components/cycle'
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'
import { Modal as DialogContent } from '@/components/ui/modal'
import { Pond } from '@/types/pond';

interface AddCycleModalProps extends React.HTMLAttributes<HTMLDivElement> {
  pondList: Pond[]
}

const AddCycleModal: React.FC<AddCycleModalProps> = ({ pondList, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div {...props}>
      {pondList.length === 0 ?
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

'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Profile } from '@/types/profile'
import { Button } from '@/components/ui/button'

interface AssigneeListModalProps {
  workers: Profile[]
  taskId: string
}

const AssigneeListModal: React.FC<AssigneeListModalProps> = ({ taskId, workers }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Dialog open={modalOpen} modal onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Pilih petugas untuk tugas {taskId}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div>
            {workers.map((worker) => {
              return (
                <div key={worker.id} className='w-full'>
                  <Button>
                    {worker.user.first_name} {worker.user.last_name}
                  </Button>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AssigneeListModal

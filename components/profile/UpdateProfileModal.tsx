'use client'

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Modal as DialogContent } from '@/components/ui/modal'
import { UpdateProfileForm } from '@/components/profile'
import { useProfile } from '@/hooks/useProfile'

const UpdateProfileModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const profile = useProfile()

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button>
            Update Profile
          </Button>
        </DialogTrigger>
        <DialogContent title='Update Profile'>
          <UpdateProfileForm profile={profile} setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileModal

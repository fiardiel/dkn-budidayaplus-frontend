'use client'

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Modal as DialogContent } from '@/components/ui/modal'
import { UpdateProfileForm } from '@/components/profile'
import { Profile } from '@/types/profile'

interface UpdateProfileModalProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: Profile
}
const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ profile, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div {...props}>
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

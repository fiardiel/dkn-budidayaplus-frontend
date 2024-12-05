'use client'

import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Modal as DialogContent } from '@/components/ui/modal'
import { UpdateProfileForm } from '@/components/profile'
import { Profile } from '@/types/profile'
import { UserRoundPen } from 'lucide-react'

interface UpdateProfileModalProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: Profile
}
const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ profile, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div {...props}>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-600'>
            Update Profile <UserRoundPen className='w-5 h-5 inline-block ml-2' />
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

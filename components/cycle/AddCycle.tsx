import { fetchPonds } from '@/lib/pond'
import React from 'react'
import { AddCycleModal } from '@/components/cycle'
import { Profile } from '@/types/profile'

interface AddCycleProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: Profile
}

const AddCycle: React.FC<AddCycleProps> = async ({ user, ...props }) => {
  const pondList = await fetchPonds()
  return (
    <div {...props}>
      {user && user.role === 'supervisor' && (
        <AddCycleModal pondList={pondList} />
      )}
    </div>
  )
}

export default AddCycle

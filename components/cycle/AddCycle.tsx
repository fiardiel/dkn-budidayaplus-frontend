import { fetchPonds } from '@/lib/pond'
import React from 'react'
import { AddCycleModal } from '@/components/cycle'

interface AddCycleProps extends React.HTMLAttributes<HTMLDivElement> { }

const AddCycle: React.FC<AddCycleProps> = async ({ ...props }) => {
  const pondList = await fetchPonds()
  return (
    <div {...props}>
      <AddCycleModal pondList={pondList} />
    </div>
  )
}

export default AddCycle

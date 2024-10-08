'use client'

import { Pond } from '@/types/pond'
import React from 'react'

interface AddCycleModalProps extends React.HTMLAttributes<HTMLDivElement> {
  ponds: Pond[]
}

const AddCycleModal: React.FC<AddCycleModalProps> = ({ponds, ...props}) => {
  return (
    <div>
    </div>
  )
}

export default AddCycleModal

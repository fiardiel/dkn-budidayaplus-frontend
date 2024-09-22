import React from 'react'
import { Pond } from '@/types/pond'
import PondCard from '@/components/pond/PondCard'

interface PondListProps {
  ponds: Pond[]
}

const PondList: React.FC<PondListProps> = ({ponds}) => {
  return (
    <div>
      <div className='flex flex-col space-y-4'>
        {ponds.map((pond) => (
          <PondCard key={pond.id} pond={pond} />
        ))}
      </div>
    </div>
  )
}

export default PondList

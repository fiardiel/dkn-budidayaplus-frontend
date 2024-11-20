import React from 'react'

interface CycleListProps extends React.HTMLAttributes<HTMLDivElement> { }

const CycleList: React.FC<CycleListProps> = async ({ ...props }) => {
  return (
    <div {...props}>
    </div>
  )
}

export default CycleList

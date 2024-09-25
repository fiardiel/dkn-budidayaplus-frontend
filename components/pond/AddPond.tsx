import React from 'react'
import { Button } from '../ui/button'
import { IoIosAdd } from 'react-icons/io'

interface AddPondProps extends React.HTMLProps<HTMLDivElement> {}

const AddPond: React.FC<AddPondProps> = (props) => {
  return (
    <div {...props}>
      <Button className='flex'>
        Tambah Kolam{' '}<IoIosAdd size={20} className='ml-1'/>
      </Button>
    </div>
  )
}

export default AddPond

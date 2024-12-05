import { fetchTeamByUsername } from '@/lib/profile'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { columns, CreateWorkerAccount } from '@/components/profile'

interface TeamProps {
  username: string
  isUserSelf: boolean
  userRole: 'worker' | 'supervisor'
}

const Team: React.FC<TeamProps> = async ({ username, userRole, isUserSelf }) => {
  const team = await fetchTeamByUsername(username)

  return (
    <div className='flex flex-col items-center'>
      <div className='w-[80%] self-center'>
        <p className='text-2xl font-semibold'>Anggota Tim</p>
        {isUserSelf && userRole === 'supervisor' &&
          <CreateWorkerAccount className='mt-4' />
        }
      </div>
      <div className='overflow-scroll flex-none max-w-full container mx-4'>
        <DataTable className='mt-6 overflow-scroll' columns={columns} data={team} />
      </div>
    </div>
  )
}

export default Team

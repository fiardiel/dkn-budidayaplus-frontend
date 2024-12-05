import { fetchTeamByUsername } from '@/lib/profile'
import React from 'react'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/profile'

interface TeamProps {
  username: string
}

const Team: React.FC<TeamProps> = async ({ username }) => {
  const team = await fetchTeamByUsername(username)
  return (
    <div className='w-[80%] self-center'>
      <p className='text-2xl font-semibold'>Anggota Tim</p>
      <DataTable className='mt-6' columns={columns} data={team} />
    </div>
  )
}

export default Team

import PondList from '@/components/pond/PondList';
import { getUser } from '@/lib/auth';
import { fetchPonds } from '@/lib/pond'
import { Pond } from '@/types/pond'
import { cookies } from 'next/headers';
import React from 'react'

const PondListPage = async () => {
  const token = cookies().get("accessToken")?.value;
  let ponds: Pond[]

  try {
    ponds = await fetchPonds();
  } catch (error) {
    ponds = [];
  }

  if (!ponds || ponds.length === 0) {
    return <div>Tidak ada kolam</div>
  }

  const user = await getUser(token);
  
  return (
    <div className='min-h-[100dvh] flex flex-col items-center justify-center py-10'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-10'>
          <div>
            <p className='text-3xl font-light'>Selamat datang</p>
            <p className='text-3xl leading-6 font-semibold'>
              {user && `${user.first_name} ${user.last_name}`}
            </p>
          </div>
          <PondList ponds={ponds} />
        </div>
      </div>
    </div>
  )
}

export default PondListPage 
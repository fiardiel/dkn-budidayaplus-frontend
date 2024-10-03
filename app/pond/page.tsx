import { PondList, AddPond } from '@/components/pond';
import { getUser } from '@/lib/auth';
import { fetchPonds } from '@/lib/pond'
import { Pond } from '@/types/pond'
import { cookies } from 'next/headers';
import React from 'react'

const PondListPage = async () => {
  const token = cookies().get("accessToken")?.value;
  let ponds: Pond[];

  try {
    ponds = await fetchPonds(token);
  } catch (error) {
    ponds = [];
  }

  const user = await getUser(token);

  return (
    <div className='min-h-[100dvh] flex flex-col items-center py-10'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-10'>
          <div>
            <p className='text-3xl leading-7 font-light'>Selamat datang</p>
            <p className='text-3xl leading-7 font-semibold mt-2'>
              {user && `${user.first_name} ${user.last_name}`}
            </p>
          </div>
          <AddPond />
          {ponds.length > 0 ?
            (
              <PondList ponds={ponds} />
            ) : (
              <p className='text-lg text-start'>Tidak ada kolam</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default PondListPage;

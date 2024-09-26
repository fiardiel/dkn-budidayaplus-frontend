import DeletePond from '@/components/pond/DeletePond';
import EditPond from '@/components/pond/EditPond';
import { fetchPond } from '@/lib/pond';
import { Pond } from '@/types/pond';
import { cookies } from 'next/headers';
import Image from 'next/image';
import React from 'react'

const PondDetailPage = async ({ params }: { params: { id: string } }) => {
  const fallbackSrc = 'fallbackimage.png'

  const token = cookies().get("accessToken")?.value;
  let pond: Pond | undefined
  try {
    pond = await fetchPond(params.id, token);
  } catch (error) {
    pond = undefined;
  }

  if (!pond) {
    return (
      <div className='min-h-[100vh] flex flex-col items-center justify-center'>
        Kolam tidak ditemukan
      </div>
    )
  }

  return (
    <div className='min-h-[100vh] flex flex-col py-10 items-center'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-10'>
          <div>
            <p className='text-3xl'>Selamat datang di</p>
            <p className='text-3xl font-semibold'>{ pond.name }</p>
          </div>
          <div>
            <p>Volume: { pond.volume }</p>
          </div>
          <div>
            <Image className='object-cover h-full w-full' src={ `/${fallbackSrc}` } width={500} height={400} alt={`${pond.name} image`} />
          </div>
          <div className='flex gap-x-2'>
            <EditPond />
            <DeletePond />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PondDetailPage

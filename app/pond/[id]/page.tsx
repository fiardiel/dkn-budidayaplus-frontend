import { DeletePond, EditPond } from '@/components/pond';
import { PondQuality } from '@/components/pond-quality';
import { FoodSampling } from '@/components/food-sampling';
import { fetchPond } from '@/lib/pond';
import Image from 'next/image';
import React from 'react'
import { FishSamplingCard } from '@/components/fish-sampling';
import { fetchCycle } from '@/hooks/non-state/fetchCycle';

const PondDetailPage = async ({ params }: { params: { id: string } }) => {
  const fallbackSrc = 'fallbackimage.png'
  const getPond = async (id: string) => {
    try {
      const pond = await fetchPond(id)
      return pond
    } catch (error) {
      return undefined
    }
  }

  const pond = await getPond(params.id)
  const volume = pond ? pond.length * pond.width * pond.depth : 0
  const cycle = await fetchCycle()

  if (!pond) {
    return (
      <div className='min-h-[100vh] flex flex-col items-center justify-center'>
        Kolam tidak ditemukan
      </div>
    )
  }

  return (
    <div className='min-h-[100vh] flex flex-col py-10 items-center mt-20'>
      <div className='w-[80%]'>
        <div className='flex flex-col space-y-8'>
          <div>
            <p className='text-3xl'>Selamat datang di</p>
            <p className='text-3xl font-semibold'>{pond.name}</p>
          </div>
          <div>
            <div className='flex gap-x-2'>
              <EditPond pond={pond} />
              <DeletePond pondId={pond.pond_id} />
            </div>
            <div className='relative mt-5'>
              <div className='absolute top-3 left-3 bg-black/10 py-1 px-2 rounded-lg'>
                <p>{volume.toFixed(2)} m<sup>3</sup></p>
              </div>
              <div>
                <Image className='object-cover h-full w-full rounded-xl' src={`/${fallbackSrc}`} width={500} height={400} alt={`${pond.name} image`} />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <PondQuality pondId={pond.pond_id} />
        </div>
        <div className='flex flex-col mt-10'>
          <FishSamplingCard pondId={pond.pond_id} cycleId={cycle?.id} />
        </div>
        <div className='flex flex-col mt-10'>
          <FoodSampling pondId={pond.pond_id} />
        </div>
      </div>
    </div>
  )
}

export default PondDetailPage;

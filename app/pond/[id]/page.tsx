import {DeletePond, EditPond} from '@/components/pond';
import { PondQualityList } from '@/components/pond-quality';
import { fetchPond } from '@/lib/pond';
import { getLatestPondQuality } from '@/lib/pond-quality';
import { Pond } from '@/types/pond';
import { PondQuality } from '@/types/pond-quality';
import AddPondQuality from '@/components/pond-quality/AddPondQuality';
import Image from 'next/image';
import React from 'react'
import { FishSampling } from '@/types/fish-sampling';
import { fetchFishSampling } from '@/lib/fish-sampling';
import { AddFishSampling, FishSamplingList } from '@/components/fish-sampling';
import { getFoodSampling } from '@/lib/food-sampling';
import { FoodSampling } from '@/types/food-sampling';
import { FoodSamplingList } from '@/components/food-sampling';

const PondDetailPage = async ({ params }: { params: { id: string } }) => {
  const fallbackSrc = 'fallbackimage.png'
  let volume = 0

  let pond: Pond | undefined
  let pondQuality: PondQuality | undefined
  let fishSampling: FishSampling[]
  let foodSampling: FoodSampling[] = []

  try {
    pond = await fetchPond(params.id);
    volume = pond.depth * pond.width * pond.length
  } catch (error) {
    pond = undefined
  }

  try {
    pondQuality = await getLatestPondQuality(params.id)
  } catch (error) {
    pondQuality = undefined
  }

  try {
    fishSampling = await fetchFishSampling(params.id)
  } catch (error) {
    fishSampling = []
  }

  try {
    foodSampling = await getFoodSampling(params.id)
  } catch (error) {
    foodSampling = []
  }

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
        <div className='flex flex-col space-y-10'>
          <div>
            <p className='text-3xl'>Selamat datang di</p>
            <p className='text-3xl font-semibold'>{pond.name}</p>
          </div>
          <div>
            <p>Volume: { volume.toFixed(2) } m<sup>3</sup></p>
          </div>
          <div>
            <Image className='object-cover h-full w-full' src={`/${fallbackSrc}`} width={500} height={400} alt={`${pond.name} image`} />
          </div>
          <div className='flex gap-x-2'>
            <EditPond pond={pond} />
            <DeletePond pondId={pond.pond_id} />
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <PondQualityList pondQuality={pondQuality} />
          
          <div className="mt-4">
            <AddPondQuality pondId={pond.pond_id} pondQuality={pondQuality}/>
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <FishSamplingList fishSampling={fishSampling} />
          
          <div className="mt-4">
            <AddFishSampling pondId={pond.pond_id} />
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <FoodSamplingList foodSampling={foodSampling} />
        </div>
      </div>
    </div>
  )
}

export default PondDetailPage;

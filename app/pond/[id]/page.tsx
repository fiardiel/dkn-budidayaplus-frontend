import { fetchPond } from '@/lib/pond';
import { fetchFishSampling } from '@/lib/fish_sampling';
import { cookies } from 'next/headers';
import Image from 'next/image';
import FishSamplingList from '@/components/fish_sampling/FishSamplingList';
import AddFishSampling from '@/components/fish_sampling/AddFishSampling';
import DeletePond from '@/components/pond/DeletePond';
import EditPond from '@/components/pond/EditPond';
import React from 'react';
import { FishSampling } from '@/types/fish_sampling';
import { Pond } from '@/types/pond';

const PondDetailPage = async ({ params }: { params: { id: string } }) => {
  const token = cookies().get("accessToken")?.value || '';
  let pond: Pond | undefined;
  let fishSampling: FishSampling[] | undefined;

  try {
    // Fetch pond details
    pond = await fetchPond(params.id, token);

    // Fetch the fish sampling list for the pond
    fishSampling = await fetchFishSampling(params.id, token);
  } catch (error) {
    console.error("Error fetching data:", error);
    pond = undefined;
    fishSampling = [];
  }

  if (!pond) {
    return (
      <div className='min-h-[100vh] flex flex-col items-center justify-center'>
        <p>Kolam tidak ditemukan</p>
      </div>
    );
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
            <p>Volume: { pond.length * pond.width * pond.depth } m<sup>3</sup></p>
          </div>
          <div>
            <Image className='object-cover h-full w-full' src={`/fallbackimage.png`} width={500} height={400} alt={`${pond.name} image`} />
          </div>
          <div className='flex gap-x-2'>
            <EditPond token={token} pondData={pond}/>
            <DeletePond pondId={pond.pond_id} />
          </div>
          <AddFishSampling token={token} pondData={pond} />
        </div>
        <div className='flex flex-col mt-10'>
          {/* Pass the fetched fish samplings to the FishSamplingList component */}
          <FishSamplingList fishSamplings={fishSampling || []} />
        </div>
      </div>
    </div>
  );
};

export default PondDetailPage;

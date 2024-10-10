'use client'

import { renderSamplingData } from '@/lib/fish-sampling/renderSamplingData'
import { FishSampling } from '@/types/fish-sampling'
import React from 'react'

interface FishSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  fishSampling: FishSampling[]
}

const FishSamplingList: React.FC<FishSamplingProps> = ({ fishSampling, ...props }) => {
  // const samplingData = () => {
  //   if (!fishSampling) {
  //     return []
  //   } else {
  //     return renderSamplingData(fishSampling)
  //   }
  // }
  // const sampling = samplingData()

  return (
    <div {...props}>
      <p className='text-2xl font-semibold'>Sampling Ikan</p>
      {fishSampling.length > 0 ? (
        <table className='mt-5 table-auto w-full'>
          <thead>
            <tr>
              <th className='text-left text-lg'>Berat Ikan (kg)</th>
              <th className='text-left text-lg'>Panjang Ikan (cm)</th>
              <th className='text-left text-lg'>Tanggal Sampling</th>
            </tr>
          </thead>
          <tbody>
            {fishSampling.map((sample, index) => (
              <tr key={sample.sampling_id || index}>
                <td className='text-xl font-semibold text-neutral-600'>{sample.fish_weight}</td>
                <td className='text-xl font-semibold text-neutral-600'>{sample.fish_length}</td>
                <td className='text-xl font-semibold text-neutral-600'>{sample.sample_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-lg text-neutral-600 mt-5'>Tidak ada sampling ikan</p>
      )}
    </div>
  )
}

export default FishSamplingList
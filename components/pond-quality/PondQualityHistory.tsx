'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { HistoryTableHeaders } from '@/components/pond-quality'
import { usePondQualityHistory } from '@/hooks/usePondQualityHistory'
import { formatDate } from 'date-fns'

interface PondQualityHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string    
}

const PondQualityHistory: React.FC<PondQualityHistoryProps> = ({pondId, ...props}) => {
  const pondQualityHistory = usePondQualityHistory(pondId)

  return (
    <div {...props}>
      <p className='font-medium text-2xl'>Riwayat Kualitas Air</p>
      <Table className='mt-5'>
        <TableHeader>
          <TableRow>
            {HistoryTableHeaders.map((item) => (
              <TableHead key={item.id}>
                <div className='flex items-center gap-1'>
                  <item.icon size={20} /> {item.title}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pondQualityHistory && pondQualityHistory.pond_qualities.length !== 0 ? (
            pondQualityHistory.pond_qualities.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p>{formatDate(item.recorded_at, 'dd-MM-yyyy')}</p>
                </TableCell>
                <TableCell>
                  <p>{item.water_temperature}</p>
                </TableCell>
                <TableCell>
                  <p>{item.ph_level}</p>
                </TableCell>
                <TableCell>
                  <p>{item.salinity}</p>
                </TableCell>
                <TableCell>
                  <p>{item.water_clarity}</p>
                </TableCell>
                <TableCell>
                  <p>{item.water_circulation}</p>
                </TableCell>
                <TableCell>
                  <p>{item.dissolved_oxygen}</p>
                </TableCell>
                <TableCell>
                  <p>{item.orp}</p>
                </TableCell>
                <TableCell>
                  <p>{item.nitrate}</p>
                </TableCell>
                <TableCell>
                  <p>{item.ammonia}</p>
                </TableCell>
                <TableCell>
                  <p>{item.phosphate}</p>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11}>Tidak ada data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  )
}

export default PondQualityHistory
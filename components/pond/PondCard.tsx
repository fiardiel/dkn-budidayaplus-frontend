'use client'

import { Pond } from '@/types/pond'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PondCardProps {
  pond: Pond
}

const PondCard: React.FC<PondCardProps> = ({ pond }) => {
  const fallbackImgSrc = 'fallbackimage.png' 
  const [imgSrc, setImgSrc] = React.useState<string>(fallbackImgSrc) //TODO: change this later

  return (
    <div>
      <Card>
        <CardHeader className='space-y-4 pb-2'>
          <Image style={{width: "auto"}} priority width={500} height={500} alt={`${pond.name} image`} src={`/${imgSrc}`} onError={() => setImgSrc(fallbackImgSrc)} />
          <CardTitle>
            {pond.name}
          </CardTitle>
        </CardHeader>
        <CardContent className='pb-2'>
          <p>Volume: {pond.depth * pond.width * pond.length} m<sup>3</sup></p>
        </CardContent>
        <CardFooter>
          <Button className='bg-blue-500 hover:bg-blue-600 active:bg-blue-700' asChild>
            <Link href={`/pond/${pond.pond_id}`}>
              View Pond
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PondCard

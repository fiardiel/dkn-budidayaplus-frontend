'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogClose, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { PondQualityForm } from '@/components/pond-quality';
import { PondQuality } from '@/types/pond-quality';

interface AddPondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  cycleId: string;
  pondQuality?: PondQuality
}


const AddPondQuality: React.FC<AddPondQualityProps> = ({ pondId, cycleId, pondQuality, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props} data-testid='add-pond-quality'>
      {pondQuality &&
        (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex text-sm" variant={'outline'} size={'sm'}>
                Sample<IoIosAdd size={20} className="ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent title='Timpa Kualitas Air'>
              <p> Apakah anda yakin untuk menimpa data kualitas air yang sebelumnya?</p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className='bg-[#ff8585] hover:bg-[#ff8585] text-white rounded-xl' onClick={() => setIsModalOpen(true)}>
                    Konfirmasi
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      }
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {!pondQuality &&
          (
            <DialogTrigger asChild>
              <Button className="flex text-sm" variant={'outline'} size={'sm'}>
                Sample<IoIosAdd size={20} className="ml-1" />
              </Button>
            </DialogTrigger>
          )
        }
        <DialogContent title="Add Pond Quality">
          <PondQualityForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycleId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPondQuality;

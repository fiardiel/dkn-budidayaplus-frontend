'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Modal as DialogContent } from '@/components/ui/modal';
import { Dialog, DialogClose, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { FoodSamplingForm } from '@/components/food-sampling';
import { FoodSampling } from '@/types/food-sampling';

interface AddFoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
  cycleId: string;
  foodSampling?: FoodSampling
}


const AddFoodSampling: React.FC<AddFoodSamplingProps> = ({ pondId, cycleId, foodSampling, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div {...props}>
      {foodSampling &&
        (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} size={'sm'} className="flex" data-testid="add-fish-sampling-button">
                Sample <IoIosAdd size={20} className="ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent title='Timpa Sampling Makanan'>
              <p> Apakah anda yakin untuk menimpa data sampling makanan yang sebelumnya?</p>
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
        {!foodSampling &&
          <DialogTrigger asChild>
            <Button className="flex text-sm" variant={'outline'} size={'sm'}>
              Sample <IoIosAdd size={20} className="ml-1" />
            </Button>
          </DialogTrigger>
        }
        <DialogContent title="Add Food Sampling">
          <FoodSamplingForm setIsModalOpen={setIsModalOpen} pondId={pondId} cycleId={cycleId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFoodSampling;

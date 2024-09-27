'use client';

import React, { useState } from 'react';
import { deletePond } from '@/lib/pond';
import { Pond } from '@/types/pond';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


type DeletePondProps = {
  pondId: Pond['pond_id'];
}

const DeletePond: React.FC<DeletePondProps> = ({ pondId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const isDeleteSuccess = await deletePond(pondId);
      if (isDeleteSuccess) {
        window.location.href = '/pond';
      } else {
        setError('Gagal menghapus kolam');
      }
    } catch (error) {
      setError('Gagal menghapus kolam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'destructive'}>
            Hapus kolam
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='justify-start'>
            <DialogTitle className='text-start'>Apakah anda yakin?</DialogTitle>
            <DialogDescription className='justify-start text-start'>
              Penghapusan tidak bisa dibatalkan. Tindakan ini akan menghapus kolam anda secara permanen. Tekan tombol x atau di luar kotak dialog untuk membatalkan.
            </DialogDescription>
            {error && <p className="text-red-500 mt-1 text-start text-sm">{error}</p>}
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading} 
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeletePond;

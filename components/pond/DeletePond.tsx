'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deletePond } from '@/lib/pond';
import { Pond } from '@/types/pond';

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
      const response = await deletePond(pondId);
      if (response.success) {
        alert('Pond deleted successfully');
        window.location.href = '/pond'; 
      } else {
        throw new Error('Failed to delete pond');
      }
    } catch (err) {
      setError('Failed to delete pond');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant={'destructive'} onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Hapus Kolam'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DeletePond;

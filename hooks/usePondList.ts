import { useEffect, useState } from "react";
import { Pond } from "@/types/pond";
import { fetchPonds } from "@/lib/pond";

export const usePondList = () => {
  const [pondList, setPondList] = useState<Pond[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPondList = async () => {
      try {
        const pondList = await fetchPonds();
        setPondList(pondList);
      } catch (err) {
        setError('Gagal memuat data kolam')
      }
    };
    fetchPondList()

    return () => {
      setPondList([]);
    };
  }, []);

  return {pondList, error}
}
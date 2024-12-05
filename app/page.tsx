import { Cycle } from "@/components/cycle";
import { formatDate } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full mb-20">
      <div className="flex justify-between items-center py-10 w-[80%] font-medium text-neutral-600">
        <div className="text-3xl">
          <p>Welcome to</p>
          <p className="text-[#2154C5] font-normal">BudidayaPlus</p>
        </div>
        <Image className="w-32 h-32" src='/BudidayaPlus.svg' width={500} height={500} alt='BudidayaPlus Logo' />
      </div>

      <div className="flex gap-2 items-center justify-center w-full">
        <div className="w-[80%] flex gap-2">
          <div className="h-5 w-0.5 bg-neutral-700" />
          <p className="text-start">
            {formatDate(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
          </p>
        </div>
      </div>

      <Cycle />

      <div className="flex flex-col items-center w-full">
        <p className="mt-10 py-10 w-[80%] text-2xl font-medium text-neutral-60">Tugas Hari Ini </p>
        <TaskByDateList />
      </div>
    </div>
  );
}

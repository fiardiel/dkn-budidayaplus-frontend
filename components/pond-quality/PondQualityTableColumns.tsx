'use client';

import { PondQuality } from "@/types/pond-quality";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Droplet, Gauge, Lightbulb, RefreshCcw, Thermometer, UserRound } from "lucide-react";

export const columns: ColumnDef<PondQuality>[] = [
  {
    accessorKey: "recorded_at",
    header: () => (
      <div className="flex gap-2">
        <Calendar />
        <p>Tanggal</p>
      </div>
    ),
    cell: ({ row }) => {
      const date = row.original.recorded_at;
      return (
        <div>
          {format(date, "dd-MM-yyyy", { locale: id })}
        </div>
      );
    },
  },
  {
    accessorKey: "water_temperature",
    header: () => (
      <div className="flex gap-2">
        <Thermometer />
        <p>Suhu</p>
      </div>
    ),
  },
  {
    accessorKey: "ph_level",
    header: () => (
      <div className="flex gap-2">
        <Droplet />
        <p>pH</p>
      </div>
    ),
  },
  {
    accessorKey: "salinity",
    header: () => (
      <div className="flex gap-2">
        <Gauge />
        <p>Salinitas</p>
      </div>
    ),
  },
  {
    accessorKey: "water_clarity",
    header: () => (
      <div className="flex gap-2">
        <Lightbulb />
        <p>Kecerahan</p>
      </div>
    ),
  },
  {
    accessorKey: "water_circulation",
    header: () => (
      <div className="flex gap-2">
        <RefreshCcw />
        <p>Sirkulasi</p>
      </div>
    ),
  },
  {
    accessorKey: "dissolved_oxygen",
    header: () => (
      <div className="flex gap-2">
        <p className="font-medium">(mg/L)</p>
        <p>DO</p>
      </div>
    ),
  },
  {
    accessorKey: "orp",
    header: () => (
      <div className="flex gap-2">
        <p className="font-medium">(mV)</p>
        <p>ORP</p>
      </div>
    ),
  },
  {
    accessorKey: "ammonia",
    header: () => (
      <div className="flex gap-2">
        <p className="font-medium">(mg/L)</p>
        <p>NH<sub>3</sub></p>
      </div>
    ),
  },
  {
    accessorKey: "nitrate",
    header: () => (
      <div className="flex gap-2">
        <p className="font-medium">(mg/L)</p>
        <p>NO<sub>3</sub></p>
      </div>
    ),
  },
  {
    accessorKey: "phosphate",
    header: () => (
      <div className="flex gap-2">
        <p className="font-medium">(mg/L)</p>
        <p>PO<sub>4</sub></p>
      </div>
    ),
  },
  {
    accessorKey: "reporter",
    header: () => (
      <div className="flex gap-2">
        <UserRound />
        <p>Reporter</p>
      </div>
    ),
    cell: ({ row }) => {
      const { first_name, last_name } = row.original.reporter;
      return (
        <div>
          {first_name} {last_name}
        </div>
      );
    },
  },
];

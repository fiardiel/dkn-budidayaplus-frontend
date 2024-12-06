import { Thermometer, Droplet, Gauge, Lightbulb, RefreshCcw } from 'lucide-react';
import { PondQuality } from '@/types/pond-quality';

const WATER_TEMP_THRESHOLD_MIN = 18;
const WATER_TEMP_THRESHOLD_MAX = 30;
const PH_LEVEL_THRESHOLD_MIN = 6.5;
const PH_LEVEL_THRESHOLD_MAX = 8.5;

export const renderQualityData = (pondQuality: PondQuality) => [
  {
    id: 1,
    icon: Thermometer,
    label: 'Suhu (°C)',
    value: `${pondQuality.water_temperature}°C`,
    className: pondQuality.water_temperature < WATER_TEMP_THRESHOLD_MIN || pondQuality.water_temperature > WATER_TEMP_THRESHOLD_MAX
      ? 'text-red-500'
      : 'text-neutral-600',
  },
  {
    id: 2,
    icon: Droplet,
    label: 'pH level',
    value: pondQuality.ph_level,
    className: pondQuality.ph_level < PH_LEVEL_THRESHOLD_MIN || pondQuality.ph_level > PH_LEVEL_THRESHOLD_MAX
      ? 'text-red-500'
      : 'text-neutral-600',
  },
  { id: 3, icon: Gauge, label: 'Salinitas', value: pondQuality.salinity, className: 'text-neutral-600' },
  { id: 4, icon: Lightbulb, label: 'Kecerahan (cm)', value: pondQuality.water_clarity, className: 'text-neutral-600' },
  { id: 5, icon: RefreshCcw, label: 'Sirkulasi', value: pondQuality.water_circulation, className: 'text-neutral-600' },
  { id: 6, icon: () => <p className='font-medium'>O<sub>2</sub></p>, label: 'DO (mg/L)', value: pondQuality.dissolved_oxygen, className: 'text-neutral-600' },
  { id: 7, icon: () => <p className='font-medium'>ORP</p>, label: '(mV)', value: pondQuality.orp, className: 'text-neutral-600' },
  { id: 8, icon: () => <p className='font-medium'>NH<sub>3</sub></p>, label: '(mg/L)', value: pondQuality.ammonia, className: 'text-neutral-600' },
  { id: 9, icon: () => <p className='font-medium'>NO<sub>3</sub></p>, label: '(mg/L)', value: pondQuality.nitrate, className: 'text-neutral-600' },
  { id: 10, icon: () => <p className='font-medium'>PO<sub>4</sub></p>, label: '(mg/L)', value: pondQuality.phosphate, className: 'text-neutral-600' },
];

import { Thermometer, Droplet, Gauge, Lightbulb, RefreshCcw } from 'lucide-react';
import { PondQuality } from '@/types/pond-quality';

export const renderQualityData = (pondQuality: PondQuality) => [
  { id: 1, icon: Thermometer, label: 'Suhu (°C)', value: `${pondQuality.water_temperature}°C` },
  { id: 2, icon: Droplet, label: 'pH level', value: pondQuality.ph_level },
  { id: 3, icon: Gauge, label: 'Salinitas', value: pondQuality.salinity },
  { id: 4, icon: Lightbulb, label: 'Kecerahan (cm)', value: pondQuality.water_clarity },
  { id: 5, icon: RefreshCcw, label: 'Sirkulasi', value: pondQuality.water_circulation },
  { id: 6, icon: () => <p className='font-medium'>O<sub>2</sub></p>, label: 'DO (mg/L)', value: pondQuality.dissolved_oxygen },
  { id: 7, icon: () => <p className='font-medium'>ORP</p>, label: '(mV)', value: pondQuality.orp },
  { id: 8, icon: () => <p className='font-medium'>NH<sub>3</sub></p>, label: '(mg/L)', value: pondQuality.ammonia },
  { id: 9, icon: () => <p className='font-medium'>NO<sub>3</sub></p>, label: '(mg/L)', value: pondQuality.nitrate },
  { id: 10, icon: () => <p className='font-medium'>PO<sub>4</sub></p>, label: '(mg/L)', value: pondQuality.phosphate },
];
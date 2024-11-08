import { Calendar, Droplet, Gauge, Lightbulb, RefreshCcw, Thermometer } from "lucide-react"

export const HistoryTableHeaders = [
    {
      id: 1,
      title: 'Tanggal',
      icon: Calendar
    },
    {
      id: 2,
      title: 'Suhu',
      icon: Thermometer
    },
    {
      id: 3,
      title: 'pH',
      icon: Droplet
    },
    {
      id: 4,
      title: 'Salinitas',
      icon: Gauge
    },
    {
      id: 5,
      'title': 'Kecerahan',
      'icon': Lightbulb
    },
    {
      id: 6,
      title: 'Sirkulasi',
      icon: RefreshCcw
    },
    {
      id: 7,
      title: '(mg/L)',
      icon: () => <p className='font-medium'>DO</p>
    },
    {
      id: 8,
      title: '(mV)',
      icon: () => <p className='font-medium'>ORP</p>
    },
    {
      id: 9,
      title: '(mg/L)',
      icon: () => <p className='font-medium'>NH<sub>3</sub></p>
    },
    {
      id: 10,
      title: '(mg/L)',
      icon: () => <p className='font-medium'>NO<sub>3</sub></p>
    },
    {
      id: 11,
      title: '(mg/L)',
      icon: () => <p className='font-medium'>PO<sub>4</sub></p>
    }
]
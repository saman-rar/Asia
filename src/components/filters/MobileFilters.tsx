'use client'

import { Accordion } from '@/components/ui/accordion'
import { Brand } from '@/payload-types'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionFilterItem from './AccordionFilterItem'
import AccordionPriceItem from './AccordionPriceItem'

const storages = [
  {
    label: '32 گیگابایت',
    value: 32,
  },
  {
    label: '64 گیگابایت',
    value: 64,
  },
  {
    label: '128 گیگابایت',
    value: 128,
  },
  {
    label: '256 گیگابایت',
    value: 256,
  },
  {
    label: '512 گیگابایت',
    value: 512,
  },
  {
    label: '1 ترابایت',
    value: 1024,
  },
]

const rams = [
  {
    label: '4 گیگابایت',
    value: 4,
  },
  {
    label: '6 گیگابایت',
    value: 6,
  },
  {
    label: '8 گیگابایت',
    value: 8,
  },
  {
    label: '12 گیگابایت',
    value: 12,
  },
  {
    label: '16 گیگابایت',
    value: 16,
  },
]

interface MobileFiltersProps {
  brands: Brand[]
}

const MobileFilters = ({ brands }: MobileFiltersProps) => {
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">فیلترها</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        {/* Price */}
        <AccordionPriceItem maxPrice={300000000} />

        {/* Brand */}
        <AccordionBrandsItem brands={brands} />

        {/* Storage */}
        <AccordionFilterItem title="حافظه داخلی" name="storage" items={storages} />

        {/* RAM */}
        <AccordionFilterItem title="مقدار RAM" name="ram" items={rams} />
      </Accordion>
    </div>
  )
}
export default MobileFilters

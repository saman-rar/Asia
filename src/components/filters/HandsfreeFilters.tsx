'use client'

import { Accordion } from '@/components/ui/accordion'
import { Brand } from '@/payload-types'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionFilterItem from './AccordionFilterItem'
import AccordionPriceItem from './AccordionPriceItem'

const types = [
  {
    label: 'بی سیم (بلوتوثی)',
    value: 'wireless',
  },
  {
    label: 'دور گردنی',
    value: 'collar-style',
  },
  {
    label: 'سیمی',
    value: 'wire',
  },
]

interface HandsfreeFiltersProps {
  brands: Brand[]
}

const HandsfreeFilters = ({ brands }: HandsfreeFiltersProps) => {
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">فیلترها</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        {/* Price */}
        <AccordionPriceItem maxPrice={4000000} />

        {/* Brand */}
        <AccordionBrandsItem brands={brands} />

        <AccordionFilterItem items={types} name="type" title="نوع هندزفری" />
      </Accordion>
    </div>
  )
}
export default HandsfreeFilters

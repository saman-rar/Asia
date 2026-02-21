'use client'

import { Accordion } from '@/components/ui/accordion'
import { Brand } from '@/payload-types'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionFilterItem from './AccordionFilterItem'
import AccordionPriceItem from './AccordionPriceItem'

const types = [
  {
    label: 'هوشمند',
    value: 'smart',
  },
  {
    label: 'ورزشی',
    value: 'fit',
  },
]
interface SmartWatchFiltersProps {
  brands: Brand[]
}

const SmartWatchFilters = ({ brands }: SmartWatchFiltersProps) => {
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">فیلترها</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        {/* Price */}
        <AccordionPriceItem maxPrice={50000000} />

        {/* Brands */}
        <AccordionBrandsItem brands={brands} />

        {/* Type */}
        <AccordionFilterItem items={types} name="type" title="نوع ساعت" />
      </Accordion>
    </div>
  )
}
export default SmartWatchFilters

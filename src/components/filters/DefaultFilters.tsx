'use client'

import { Accordion } from '@/components/ui/accordion'
import { Brand } from '@/payload-types'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionPriceItem from './AccordionPriceItem'

interface DefaultFiltersProps {
  brands: Brand[]
}

const DefaultFilters = ({ brands }: DefaultFiltersProps) => {
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
      </Accordion>
    </div>
  )
}
export default DefaultFilters

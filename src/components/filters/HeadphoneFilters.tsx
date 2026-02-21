'use client'

import { Accordion } from '@/components/ui/accordion'
import { Brand } from '@/payload-types'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionFilterItem from './AccordionFilterItem'
import AccordionPriceItem from './AccordionPriceItem'

const connections = [
  {
    label: 'بی سیم',
    value: 'wireless',
  },
  {
    label: 'سیمی',
    value: 'wire',
  },
  {
    label: 'دوگانه (بی‌سیم و با سیم)',
    value: 'both',
  },
]

const type = [
  {
    label: 'هدفون',
    value: 'headphone',
  },
  {
    label: 'هدست',
    value: 'headset',
  },
]

const users = [
  {
    label: 'گیمینگ',
    value: 'gaming',
  },
  {
    label: 'عادی',
    value: 'normal',
  },
  {
    label: 'بچه‌گانه و فانتزی',
    value: 'kids',
  },
]

interface HeadPhoneFilters {
  brands: Brand[]
}

const HeadphoneFilters = ({ brands }: HeadPhoneFilters) => {
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">فیلترها</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        {/* Price */}
        <AccordionPriceItem maxPrice={30000000} />

        {/* Brand */}
        <AccordionBrandsItem brands={brands} />

        {/* Connection */}
        <AccordionFilterItem
          items={connections}
          name="connection"
          title="نوع اتصال"
          QueryReplace={true}
        />

        {/* Type */}
        <AccordionFilterItem
          items={type}
          name="type"
          title="نوع هدفون یا هدست"
          QueryReplace={true}
        />

        {/* Users */}
        <AccordionFilterItem items={users} name="user" title="نوع کاربری" />
      </Accordion>
    </div>
  )
}
export default HeadphoneFilters

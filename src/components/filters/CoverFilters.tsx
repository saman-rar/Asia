'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import { useState } from 'react'
import { Checkbox } from '../ui/checkbox'

const brands = [
  {
    brand: 'اپل',
    value: 'apple',
    models: [
      {
        label: 'Iphone 6',
        value: 'iphone-6',
      },
      {
        label: 'Iphone 6s',
        value: 'iphone-6s',
      },
      {
        label: 'Iphone 6 plus',
        value: 'iphone-6-plus',
      },
      {
        label: 'Iphone 6s plus',
        value: 'iphone-6s-plus',
      },
    ],
  },
  {
    brand: 'سامسونگ',
    value: 'samsung',
    models: [
      {
        label: 'A16',
        value: 'a16',
      },
      {
        label: 'A26',
        value: 'a26',
      },
      {
        label: 'A36',
        value: 'a36',
      },
      {
        label: 'A56',
        value: 'a56',
      },
    ],
  },
  {
    brand: 'شیائومی',
    value: 'xiaomi',
    models: [
      {
        label: 'Redmi note 11',
        value: 'redmi-note-11',
      },
      {
        label: 'Redmi note 11s',
        value: 'redmi-note-11s',
      },
      {
        label: 'Redmi note 11 pro',
        value: 'redmi-note-11-pro',
      },
    ],
  },
]

const CoverFilters = () => {
  const [price, setPrice] = useState([0, 300000000])
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">انتخاب مدل</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        {brands.map((brand) => (
          <AccordionItem value={brand.value} className="py-4" key={brand.value}>
            <AccordionTrigger>{brand.brand}</AccordionTrigger>
            <AccordionContent className="h-auto">
              <div className="w-full px-3">
                {brand.models.map((model) => (
                  <Link
                    href="/mobile"
                    key={model.value}
                    className="flex gap-2 items-center border-b last:border-none py-5 no-underline!"
                  >
                    <Checkbox />
                    <span>{model.label}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
export default CoverFilters

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
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

const brands = [
  {
    label: 'اپل',
    value: 'apple',
  },
  {
    label: 'سامسونگ',
    value: 'samsung',
  },
  {
    label: 'شیائومی',
    value: 'xiaomi',
  },
]

const types = [
  {
    label: 'بی سیم (بلوتوثی)',
    value: 'wireless',
  },
  {
    label: 'دور گردنی',
    valule: 'collar-style',
  },
  {
    label: 'سیمی',
    value: 'wire',
  },
]

const HandsfreeFilters = () => {
  const [price, setPrice] = useState([0, 300000000])
  return (
    <div className="border rounded-lg p-5 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-xl">فیلترها</h3>
        <span className="text-xs">حذف فیلترها</span>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="price" className="py-4">
          <AccordionTrigger>محدوده قیمت</AccordionTrigger>
          <AccordionContent className="space-y-2 h-auto">
            <div className="flex gap-2 items-center">
              <span>از</span>
              <Input />
              <span>تومان</span>
            </div>
            <div className="flex gap-2 items-center">
              <span>تا</span>
              <Input />
              <span>تومان</span>
            </div>
            <div className="w-full">
              <Slider
                defaultValue={[0, 300000000]}
                max={300000000}
                step={5}
                className="mx-auto w-full max-w-xs mt-10 mb-5"
              />
              <div className="flex justify-between">
                <span>ارزان‌ترین</span>
                <span>گران‌ترین</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand" className="py-4">
          <AccordionTrigger>برند</AccordionTrigger>
          <AccordionContent className="h-auto">
            <div className="w-full px-3">
              {brands.map((brand) => (
                <Link
                  href="/mobile"
                  key={brand.value}
                  className="flex justify-between items-center border-b last:border-none py-5 no-underline!"
                >
                  <span>{brand.label}</span>
                  <span className="text-muted-foreground">{brand.value}</span>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type" className="py-4">
          <AccordionTrigger>نوع هندزفری</AccordionTrigger>
          <AccordionContent className="h-auto">
            <div className="w-full px-3">
              {types.map((type) => (
                <Link
                  href="/mobile"
                  key={type.value}
                  className="flex gap-2 items-center border-b last:border-none py-5 no-underline!"
                >
                  <Checkbox />
                  <span>{type.label}</span>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
export default HandsfreeFilters

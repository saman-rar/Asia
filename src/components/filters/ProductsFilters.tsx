'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Brand, Category } from '@/payload-types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import AccordionBrandsItem from './AccordionBrandsItem'
import AccordionPriceItem from './AccordionPriceItem'

interface ProductsFiltersProps {
  categories: Category[]
  brands: Brand[]
}

const ProductsFilters = ({ categories, brands }: ProductsFiltersProps) => {
  const [price, setPrice] = useState([0, 300000000])

  const searchParams = useSearchParams()

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

        {/* Categories */}
        <AccordionItem value="categories" className="py-4">
          <AccordionTrigger>دسته بندی‌ها</AccordionTrigger>
          <AccordionContent className="h-auto">
            <div className="w-full px-3">
              {categories.map((category) => (
                <Link
                  href={
                    searchParams
                      ? `/${category.name}?${searchParams.toString()}`
                      : `/${category.name}`
                  }
                  key={category.id}
                  className="flex justify-between items-center border-b last:border-none py-5 no-underline!"
                >
                  <span>{category.label}</span>
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
export default ProductsFilters

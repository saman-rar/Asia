'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Category } from '@/payload-types'
import { Boxes } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

interface CategoryModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  categories: Category[]
}

export function CategoryModal({ setIsOpen, isOpen, categories }: CategoryModalProps) {
  const pathname = usePathname()

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches

  useEffect(() => {
    // Close the cart modal when the pathname changes.
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen} modal={true}>
      <SheetTrigger asChild>
        <Boxes className="scale-80" />
      </SheetTrigger>

      <SheetContent className="flex flex-col w-500 " side={isMobile ? 'bottom' : 'right'}>
        <SheetHeader>
          <SheetTitle>دسته بندی محصولات</SheetTitle>

          <SheetDescription>دسته بندی مورد نظر را انتخاب کنید.</SheetDescription>
        </SheetHeader>

        <div className="grow flex px-4 pb-2">
          <div className="flex flex-col justify-between w-full gap-2">
            {categories.map((category) => (
              <Link
                className="flex justify-center py-2 px-4 bg-secondary transition duration-150 ease-in hover:bg-primary-light hover:text-white rounded-2xl"
                href={`/${category.name}`}
                key={category.id}
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

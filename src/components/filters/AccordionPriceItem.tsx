import { getFaFormattedPrice, getNormalNumber } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'

const AccordionPriceItem = ({ maxPrice }: { maxPrice: number }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialMin = Number(searchParams.get('minPrice')) || 0
  const initialMax = Number(searchParams.get('maxPrice')) || maxPrice

  const [price, setPrice] = useState([initialMin, initialMax])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    params.set('minPrice', price[0].toString())
    params.set('maxPrice', price[1].toString())

    const delayDebounceFn = setTimeout(() => {
      console.log(params)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [price, pathname, router])

  return (
    <AccordionItem value="price" className="py-4">
      <AccordionTrigger>محدوده قیمت</AccordionTrigger>
      <AccordionContent className="space-y-2 h-auto">
        <div className="flex gap-2 items-center">
          <span>از</span>
          <Input
            value={getFaFormattedPrice(price[0])}
            onChange={(e) => setPrice([getNormalNumber(e.target.value), price[1]])}
          />
          <span>تومان</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>تا</span>
          <Input
            value={getFaFormattedPrice(price[1])}
            onChange={(e) => setPrice([price[0], getNormalNumber(e.target.value)])}
          />
          <span>تومان</span>
        </div>
        <div className="w-full">
          <Slider
            value={price}
            max={300000000}
            step={1000}
            className="mx-auto w-full max-w-xs mt-10 mb-5"
            onValueChange={(value) => setPrice(value)}
          />
          <div className="flex justify-between">
            <span>ارزان‌ترین</span>
            <span>گران‌ترین</span>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
export default AccordionPriceItem

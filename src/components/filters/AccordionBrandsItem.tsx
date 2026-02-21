import { createQueryString } from '@/lib/utils'
import { Brand } from '@/payload-types'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'

const AccordionBrandsItem = ({ brands }: { brands: Brand[] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return (
    <AccordionItem value="brand" className="py-4">
      <AccordionTrigger>برند</AccordionTrigger>
      <AccordionContent className="h-auto">
        <div className="w-full px-3">
          {brands.map((brand) => (
            <Link
              href={
                pathname +
                '?' +
                createQueryString(
                  [
                    {
                      key: 'brand',
                      value: brand.slug,
                      replace: false,
                    },
                  ],
                  searchParams,
                )
              }
              key={brand.id}
              className="flex justify-between items-center border-b last:border-none py-5 no-underline!"
            >
              <div className="flex items-center gap-1.5">
                <Checkbox
                  checked={searchParams.getAll('brand').includes(brand.slug)}
                  className="cursor-pointer"
                />
                <span>{brand.label}</span>
              </div>
              <span className="text-muted-foreground">{brand.name}</span>
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
export default AccordionBrandsItem

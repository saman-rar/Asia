import { createQueryString } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'

interface AccordionFilterItemProps {
  name: string
  title: string
  QueryReplace?: boolean
  items: {
    label: string
    value: number | string
  }[]
}

const AccordionFilterItem = ({ items, name, title, QueryReplace }: AccordionFilterItemProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <AccordionItem value={name} className="py-4">
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="h-auto">
        <div className="w-full px-3">
          {items.map((item) => (
            <Link
              href={
                pathname +
                '?' +
                createQueryString(
                  [
                    {
                      key: name,
                      value: item.value.toString(),
                      replace: QueryReplace,
                    },
                  ],
                  searchParams,
                )
              }
              key={item.value}
              className="flex gap-2 items-center border-b last:border-none py-5 no-underline!"
            >
              <Checkbox
                checked={searchParams.getAll(name).includes(item.value.toString())}
                className="cursor-pointer"
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
export default AccordionFilterItem

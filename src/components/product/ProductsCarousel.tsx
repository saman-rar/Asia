import configPromise from '@payload-config'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { ProductItem } from '../ProductItem'
import { Card } from '../ui/card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export default async function ProductsCarousel() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
  })

  return (
    <ScrollArea className="w-full rounded-md whitespace-nowrap">
      <div className="flex w-max space-x-1 py-6">
        {docs.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            className="rounded-none first:rounded-tr-xl first:rounded-br-xl"
          />
        ))}
        <Card className="py-0 px-0 overflow-hidden rounded-none rounded-tl-xl rounded-bl-xl">
          <div className="flex h-full w-37 aspect-square">
            <Link
              href="/"
              className="w-full h-full flex flex-col justify-center items-center gap-7 group text-card-foreground"
            >
              <ArrowLeftCircle
                strokeWidth={1.25}
                className="scale-300 group-hover:scale-310 transition duration-150 ease-in"
              />
              <span>مشاهده همه</span>
            </Link>
          </div>
        </Card>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

import { Media as MediaType } from '@/payload-types'
import configPromise from '@payload-config'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import { Media } from './Media'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

const FeatuedBrands = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'brands',
  })

  return (
    <div className="lg:border-2 rounded-2xl py-5">
      <div className="flex justify-center items-center gap-2 mb-6 lg:mb-8">
        <Sparkles color="#f59e42" />
        <h3 className="text-2xl">محبوب ترین برند ها</h3>
      </div>
      <ScrollArea className="w-full whitespace-nowrap text-center py-3">
        <div dir="ltr" className="flex w-full justify-evenly gap-3">
          {docs.map((brand) => (
            <Link
              href={`/brands/${brand.slug}`}
              className="relative w-24 overflow-hidden bg-primary-light aspect-square rounded-full"
              key={brand.name}
            >
              <Media
                className="relative p-5 invert dark:invert-0 w-full h-full"
                imgClassName="object-cover w-full h-full"
                resource={brand.icon as MediaType}
              />
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
export default FeatuedBrands

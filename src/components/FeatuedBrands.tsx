import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

const featuredBrands = [
  {
    name: 'Apple',
    image: '/featured-brands/apple.svg',
  },
  {
    name: 'Samsung',
    image: '/featured-brands/samsung.svg',
  },
  {
    name: 'Xiaomi',
    image: '/featured-brands/xiaomi.svg',
  },
  {
    name: 'Lenovo',
    image: '/featured-brands/lenovo.svg',
  },
  {
    name: 'QCY',
    image: '/featured-brands/QCY.svg',
  },
  {
    name: 'TSCO',
    image: '/featured-brands/TSCO.png',
  },
]

const FeatuedBrands = () => {
  return (
    <ScrollArea className="w-full  whitespace-nowrap text-center rounded-2xl lg:border-2 py-5">
      <div className="flex justify-center items-center gap-2 mb-6">
        <Sparkles color="#f59e42" />
        <h3 className="text-2xl">محبوب ترین برند ها</h3>
      </div>
      <div className="flex w-full justify-evenly">
        {featuredBrands.map((brand) => (
          <div
            className="relative w-24 overflow-hidden bg-primary-light aspect-square rounded-full"
            key={brand.name}
          >
            <Image className="p-5 invert dark:invert-0" src={brand.image} alt={brand.name} fill />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
export default FeatuedBrands

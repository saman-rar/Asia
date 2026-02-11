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
    image: '/featured-brands/xiomi.svg',
  },
  {
    name: 'Lenovo',
    image: '/featured-brands/lenovo.svg',
  },
  {
    name: 'QCY',
    image: 'QCY.svg',
  },
  {
    name: 'TSCO',
    image: '/featured-brands/TSCO.svg',
  },
]

const FeatuedBrands = () => {
  return (
    <ScrollArea className="w-full rounded-md whitespace-nowrap">
      <div className="flex w-max space-x-1 p-4">
        {featuredBrands.map((brand) => (
          <div key={brand.name}>{brand.name}</div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
export default FeatuedBrands

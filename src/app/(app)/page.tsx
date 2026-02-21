import FeatuedBrands from '@/components/FeatuedBrands'
import HeroCarousel from '@/components/HeroCarousel'
import HomeGridItem from '@/components/HomeGridItem'
import ProductsCarousel from '@/components/product/ProductsCarousel'
import configPromise from '@payload-config'
import { ChevronLeft, Percent } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const home = await payload.findGlobal({
    slug: 'home',
  })

  return (
    <article className="pt-0 lg:pt-10 pb-24 space-y-7">
      {/* Carousel */}
      <div className="w-full">
        <HeroCarousel slides={home.heroSlides} />
      </div>

      {/* Special Offer */}
      <div className="container">
        <div className="relative w-full bg-primary-light py-5 px-4 text-white rounded-2xl">
          {/* Header */}
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <h2 className="flex gap-2 font-bold">
                <Percent strokeWidth={3} />
                <span className="text-xl md:text-2xl">فروش شگفت انگیز</span>
              </h2>
            </div>
            <Link
              href="/products/off"
              className="flex items-center gap-0.5 text-sm text-white/80  transition duration-150 ease-in hover:text-white"
            >
              همه <ChevronLeft size={16} />
            </Link>
          </div>
          {/* Main */}
          <div className="w-full flex justify-center">
            <ProductsCarousel />
          </div>
        </div>
      </div>

      {/* Products Grid 2*2*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-5 w-full container">
        {home.promoGrid2x2?.map((item) => (
          <HomeGridItem item={item} key={item.id} aspect="aspect-video" />
        ))}
      </div>

      {/* Featured Brands */}
      <div className="lg:container">
        <FeatuedBrands />
      </div>

      {/* Sperator */}
      <div className="my-12 w-full h-3 bg-border" />

      {/* Products */}
      <div className="container">
        <div className="rounded-2xl pt-3">
          {/* Smartphones */}
          <div className="relative w-full py-5">
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h2 className="flex gap-2 font-bold dark:text-sky-500">
                  <span className="text-xl md:text-2xl">محبوب ترین موبایل ها</span>
                </h2>
              </div>
              <Link
                href="/products/off"
                className="flex items-center gap-0.5 text-sm text-black/70 dark:text-sky-700 transition duration-150 ease-in hover:text-black dark:hover:text-sky-500"
              >
                همه <ChevronLeft size={16} />
              </Link>
            </div>
            {/* Main */}
            <div className="w-full flex justify-center">
              <ProductsCarousel />
            </div>
          </div>
          {/* Speakers */}
          <div className="relative w-full py-5">
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h2 className="flex gap-2 font-bold dark:text-sky-500">
                  <span className="text-xl md:text-2xl">محبوب ترین اسپیکر ها</span>
                </h2>
              </div>
              <Link
                href="/products/off"
                className="flex items-center gap-0.5 text-sm text-black/70 dark:text-sky-700 transition duration-150 ease-in hover:text-black dark:hover:text-sky-500"
              >
                همه <ChevronLeft size={16} />
              </Link>
            </div>
            {/* Main */}
            <div className="w-full flex justify-center">
              <ProductsCarousel />
            </div>
          </div>
          {/* Handsfree */}
          <div className="relative w-full py-5">
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h2 className="flex gap-2 font-bold dark:text-sky-500">
                  <span className="text-xl md:text-2xl">محبوب ترین هندزفری ها</span>
                </h2>
              </div>
              <Link
                href="/products/off"
                className="flex items-center gap-0.5 text-sm text-black/70 dark:text-sky-700 transition duration-150 ease-in hover:text-black dark:hover:text-sky-500"
              >
                همه <ChevronLeft size={16} />
              </Link>
            </div>
            {/* Main */}
            <div className="w-full flex justify-center">
              <ProductsCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid 2*1*/}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-full container">
        {home.promoGrid2x2?.map((item) => (
          <HomeGridItem item={item} key={item.id} aspect="aspect-square" />
        ))}
      </div>

      {/* Best sellers */}
      <div className="container">
        <div className="rounded-2xl pt-3">
          {/* Products */}
          <div className="relative w-full py-5">
            {/* Header */}
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <h2 className="flex gap-2 font-bold dark:text-sky-500">
                  <span className="text-xl md:text-2xl">پرفروش ترین ها</span>
                </h2>
              </div>
              <Link
                href="/products/off"
                className="flex items-center gap-0.5 text-sm text-black/70 dark:text-sky-700 transition duration-150 ease-in hover:text-black dark:hover:text-sky-500"
              >
                همه <ChevronLeft size={16} />
              </Link>
            </div>
            {/* Main */}
            <div className="w-full flex justify-center">
              <ProductsCarousel />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

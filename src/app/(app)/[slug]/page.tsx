import type { Metadata } from 'next'

import { homeStaticData } from '@/endpoints/seed/home-static'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import FeatuedBrands from '@/components/FeatuedBrands'
import HeroCarousel from '@/components/HeroCarousel'
import ProductsCarousel from '@/components/product/ProductsCarousel'
import type { Page } from '@/payload-types'
import { ChevronLeft, Percent } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params }: Args) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
  })

  console.log(docs)

  const { slug = 'home' } = await params
  const url = '/' + slug

  let page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24 space-y-7">
      {/* Carousel */}
      <div className="w-full">
        <HeroCarousel />
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

      {/* Products Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full aspect-2/1 container">
        <div className="relative rounded-2xl overflow-hidden">
          <Image src="/grid.png" fill alt="grid" className="object-cover" />
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          <Image src="/grid.png" fill alt="grid" className="object-cover" />
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          <Image src="/grid.png" fill alt="grid" className="object-cover" />
        </div>
        <div className="relative rounded-2xl overflow-hidden">
          <Image src="/grid.png" fill alt="grid" className="object-cover" />
        </div>
      </div>

      {/* Featured Brands */}
      <div className="container">
        <FeatuedBrands />
      </div>

      {/* Sperator */}
      <div className="my-12 w-full h-3 bg-border" />

      {/* Products */}
      <div className="bg-accent dark:bg-card container rounded-2xl">
        {/* Smartphones */}
        <div className="relative w-full py-5 px-4">
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
        <div className="relative w-full py-5 px-4">
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
        <div className="relative w-full py-5 px-4">
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
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params

  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}

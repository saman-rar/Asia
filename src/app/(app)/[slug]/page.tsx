import MyBreadcrumb from '@/components/Breadcrumb'
import CoverFilters from '@/components/filters/CoverFilters'
import DefaultFilters from '@/components/filters/DefaultFilters'
import GlassFilters from '@/components/filters/GlassFilters'
import HandsfreeFilters from '@/components/filters/HandsfreeFilters'
import HeadphoneFilters from '@/components/filters/HeadphoneFilters'
import MobileFilters from '@/components/filters/MobileFilters'
import ProductsFilters from '@/components/filters/ProductsFilters'
import SmartWatchFilters from '@/components/filters/SmartWatchFilters'
import SpeakerFilters from '@/components/filters/SpeakerFilters'
import { ProductItem } from '@/components/ProductItem'
import { Brand } from '@/payload-types'

import configPromise from '@payload-config'
import { SortDesc } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { JSX } from 'react'

const sort = [
  {
    label: 'پرفروش‌ترین',
    value: 'best-seller',
  },
  {
    label: 'جدیدترین',
    value: 'new',
  },
  {
    label: 'ارزان‌ترین',
    value: 'chip',
  },
  {
    label: 'گران‌ترین',
    value: 'expensive',
  },
]

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q: string }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { q } = await searchParams

  const payload = await getPayload({ config: configPromise })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'id',
  })

  const categoryId = categories.find((category) => category.name === slug)?.id

  let brands: Brand[]
  if (slug === 'products') {
    const { docs } = await payload.find({
      collection: 'brands',
    })

    brands = docs
  } else {
    const { docs } = await payload.find({
      collection: 'brands',
      where: {
        categories: {
          contains: categoryId || 0,
        },
      },
    })

    brands = docs
  }

  if (slug === 'home') {
    if (!q) {
      return redirect('/')
    }
  }

  let breadCrumb: {
    title: string
    href: string
  } = {
    title: '',
    href: '/',
  }

  let title: string = 'فروشگاه آسیا'

  let Filter: JSX.Element = <DefaultFilters />

  if (slug === 'products') {
    breadCrumb = {
      title: 'محصولات',
      href: '/products',
    }
    title = 'محصولات'
    Filter = <ProductsFilters categories={categories} brands={brands} />
  } else if (slug === 'mobile') {
    breadCrumb = {
      title: 'موبایل',
      href: '/mobile',
    }
    title = 'گوشی موبایل'
    Filter = <MobileFilters brands={brands} />
  } else if (slug === 'speaker') {
    breadCrumb = {
      title: 'اسپیکر',
      href: '/speaker',
    }
    title = 'اسپیکر (بلندگو)'
    Filter = <SpeakerFilters brands={brands} />
  } else if (slug === 'smart-watch') {
    breadCrumb = {
      title: 'ساعت هوشمند',
      href: '/smart-watch',
    }
    title = 'ساعت هوشمند'
    Filter = <SmartWatchFilters brands={brands} />
  } else if (slug === 'handsfree') {
    breadCrumb = {
      title: 'هندزفری',
      href: '/handsfree',
    }
    title = 'هندزفری سیمی و بلوتوثی'
    Filter = <HandsfreeFilters brands={brands} />
  } else if (slug === 'headphone') {
    breadCrumb = {
      title: 'هدفون و هدست',
      href: '/headphone',
    }
    title = 'هدفون و هدست'
    Filter = <HeadphoneFilters brands={brands} />
  } else if (slug === 'cover') {
    breadCrumb = {
      title: 'قاب و کاور گوشی',
      href: '/cover',
    }
    title = 'قاب محافظ و کاور گوشی'
    Filter = <CoverFilters />
  } else if (slug === 'glass') {
    breadCrumb = {
      title: 'گلس گوشی',
      href: '/glass',
    }
    title = 'گلس (ضدخش) گوشی'
    Filter = <GlassFilters />
  }

  let where: any = {}

  if (q) {
    where = {
      ...where,
      title: {
        like: q,
      },
    }
  }

  if (slug !== 'products') {
    where = {
      ...where,
      category: {
        equals: categoryId || 0,
      },
    }
  }

  const { docs: products } = await payload.find({
    collection: 'products',
    where,
  })

  return (
    <article className="pt-16 pb-24 space-y-7 container">
      {/* Breadcrumb */}
      <MyBreadcrumb links={[{ title: 'فروشگاه آسیا', href: '/' }, breadCrumb]} />

      {/* Page Title */}
      <h1>{q || title}</h1>

      {/* Main */}
      <div className="flex w-full">
        {/* Filter Tab */}
        <div className="w-[25%]">{Filter}</div>
        {/* Products */}
        <div>
          {/* Sort */}
          <div className="flex gap-3 py-3 px-5">
            <div className="flex gap-1 items-center">
              <SortDesc />
              مرتب سازی:
            </div>
            <div className="flex gap-3 text-muted-foreground">
              {sort.map((s) => (
                <Link href={`/`} key={s.value}>
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-3 py-4 px-10">
            {products.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

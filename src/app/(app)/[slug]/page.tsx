import MyBreadcrumb from '@/components/Breadcrumb'
import CoverFilters from '@/components/filters/CoverFilters'
import GlassFilters from '@/components/filters/GlassFilters'
import HandsfreeFilters from '@/components/filters/HandsfreeFilters'
import HeadphoneFilters from '@/components/filters/HeadphoneFilters'
import MobileFilters from '@/components/filters/MobileFilters'
import SmartWatchFilters from '@/components/filters/SmartWatchFilters'
import SpeakerFilters from '@/components/filters/SpeakerFilters'
import { ProductItem } from '@/components/ProductItem'

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (slug === 'home') {
    redirect('/')
  }

  let collection:
    | 'users'
    | 'pages'
    | 'categories'
    | 'media'
    | 'forms'
    | 'form-submissions'
    | 'addresses'
    | 'variants'
    | 'variantTypes'
    | 'variantOptions'
    | 'products'
    | 'carts'
    | 'orders'
    | 'transactions'
    | 'payload-kv'
    | 'payload-locked-documents'
    | 'payload-preferences'
    | 'payload-migrations' = 'products'

  let breadCrumb: {
    title: string
    href: string
  } = {
    title: '',
    href: '/',
  }

  let title: string = 'فروشگاه آسیا'

  let Filter: JSX.Element = <></>

  if (slug === 'mobile') {
    collection = 'products'
    breadCrumb = {
      title: 'موبایل',
      href: '/mobile',
    }
    title = 'گوشی موبایل'
    Filter = <MobileFilters />
  }

  if (slug === 'speaker') {
    collection = 'products'
    breadCrumb = {
      title: 'اسپیکر',
      href: '/speaker',
    }
    title = 'اسپیکر (بلندگو)'
    Filter = <SpeakerFilters />
  }

  if (slug === 'smart-watch') {
    collection = 'products'
    breadCrumb = {
      title: 'ساعت هوشمند',
      href: '/smart-watch',
    }
    title = 'ساعت هوشمند'
    Filter = <SmartWatchFilters />
  }

  if (slug === 'handsfree') {
    collection = 'products'
    breadCrumb = {
      title: 'هندزفری',
      href: '/handsfree',
    }
    title = 'هندزفری سیمی و بلوتوثی'
    Filter = <HandsfreeFilters />
  }

  if (slug === 'headphone') {
    collection = 'products'
    breadCrumb = {
      title: 'هدفون و هدست',
      href: '/headphone',
    }
    title = 'هدفون و هدست'
    Filter = <HeadphoneFilters />
  }

  if (slug === 'cover') {
    collection = 'products'
    breadCrumb = {
      title: 'قاب و کاور گوشی',
      href: '/cover',
    }
    title = 'قاب محافظ و کاور گوشی'
    Filter = <CoverFilters />
  }

  if (slug === 'glass') {
    collection = 'products'
    breadCrumb = {
      title: 'گلس گوشی',
      href: '/glass',
    }
    title = 'گلس (ضدخش) گوشی'
    Filter = <GlassFilters />
  }

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection,
  })
  return (
    <article className="pt-16 pb-24 space-y-7 container">
      {/* Breadcrumb */}
      <MyBreadcrumb links={[{ title: 'فروشگاه آسیا', href: '/' }, breadCrumb]} />

      {/* Page Title */}
      <h1>{title}</h1>

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
            {docs.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

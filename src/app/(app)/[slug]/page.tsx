import MyBreadcrumb from '@/components/Breadcrumb'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (slug === 'home') {
    redirect('/')
  }

  if (slug === 'mobile') {
    return (
      <article className="pt-16 pb-24 space-y-7 container">
        {/* Breadcrumb */}
        <MyBreadcrumb
          links={[
            { title: 'فروشگاه آسیا', href: '/' },
            {
              title: 'موبایل',
              href: '/mobile',
            },
          ]}
        />

        {/* Page Title */}
        <h1>گوشی موبایل</h1>

        {/* Main */}
        <div className="flex">
          {/* Filter Tab */}
          <article>
            <div className="flex justify-between items-center">
              <h3>فیلترها</h3>
              <span>حذف فیلتر ها</span>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>محدوده قیمت</AccordionTrigger>
                <AccordionContent>salam</AccordionContent>
              </AccordionItem>
            </Accordion>
          </article>
        </div>
      </article>
    )
  }
}

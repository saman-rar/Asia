import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DefaultDocumentIDType, slugField, Where } from 'payload'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'price', 'isFeatured', '_status'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    price: true,
    isFeatured: true,
    meta: true,
  },
  fields: [
    { name: 'title', label: 'نام محصول', type: 'text', required: true },
    {
      name: 'isFeatured',
      label: 'محصل شاخص',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'اگر میخواهید محصول مورد نظر درون صفحه اصلی نمایش داده شود انتخاب کنید',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              label: 'گالری',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  label: 'تصویر',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  label: 'مرتبط به کدام تنوع',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: any) => {
                        if (typeof item === 'object' && item?.id) {
                          return item.id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },
          ],
          label: 'محتوای محصول',
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'isOff',
              label: 'دارای تخفیف',
              type: 'checkbox',
              admin: {
                description: 'اگه محصول مورد نظر دارای تخفیف است فعال کنید',
              },
              defaultValue: false,
            },
            {
              name: 'discountedPrice',
              label: 'قمیت نهایی(با تخفیف)',
              type: 'number',
              admin: {
                description: 'اگر تخفیف فعال باشد از این قیمت برای پرداهت نهایی استفاده میشود.',
                condition: (data) => data.isOff,
              },
            },
            {
              name: 'relatedProducts',
              label: 'محصولات مرتبط',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'جزئیات محصول',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: 'عنوان',
              },
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: {
                label: 'تصویر',
              },
            }),
            MetaDescriptionField({
              overrides: {
                label: 'توضیحات',
              },
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    // روابط: هر محصول یک دسته‌بندی و یک برند
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'دسته‌بندی',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brandRef',
      type: 'relationship',
      relationTo: 'brands',
      label: 'برند',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    // فیلدهای مخصوص موبایل
    {
      name: 'mobileStorage',
      type: 'select',
      label: 'حافظه داخلی (موبایل)',
      options: [
        { label: '32 گیگابایت', value: '32' },
        { label: '64 گیگابایت', value: '64' },
        { label: '128 گیگابایت', value: '128' },
        { label: '256 گیگابایت', value: '256' },
        { label: '512 گیگابایت', value: '512' },
        { label: '1 ترابایت', value: '1024' },
      ],
      admin: {
        position: 'sidebar',
        condition: (data) => {
          console.log(data.category)
          return data.category === 4
        },
      },
    },
    {
      name: 'mobileRam',
      type: 'select',
      label: 'حافظه RAM (موبایل)',
      options: [
        { label: '4 گیگابایت', value: '4' },
        { label: '6 گیگابایت', value: '6' },
        { label: '8 گیگابایت', value: '8' },
        { label: '12 گیگابایت', value: '12' },
        { label: '16 گیگابایت', value: '16' },
      ],
      admin: {
        condition: (data) => data.category === 4,
        position: 'sidebar',
      },
    },
    // فیلدهای مخصوص اسپیکر
    {
      name: 'speakerType',
      type: 'select',
      label: 'نوع اسپیکر',
      options: [
        { label: 'رومیزی', value: 'desktop' },
        { label: 'قابل حمل', value: 'portable' },
        { label: 'خانگی', value: 'home' },
      ],
      admin: {
        position: 'sidebar',
        condition: (data) => data.category === 5,
      },
    },
    // فیلدهای مخصوص هندزفری
    {
      name: 'handsfreeType',
      type: 'select',
      label: 'نوع هندزفری',
      options: [
        { label: 'بی سیم (بلوتوثی)', value: 'wireless' },
        { label: 'دور گردنی', value: 'collar-style' },
        { label: 'سیمی', value: 'wire' },
      ],
      admin: {
        position: 'sidebar',
        condition: (data) => data.category === 7,
      },
    },
    // فیلدهای مخصوص هدفون / هدست
    {
      name: 'headphoneConnection',
      type: 'select',
      label: 'نوع اتصال',
      options: [
        { label: 'بی سیم', value: 'wireless' },
        { label: 'سیمی', value: 'wire' },
        { label: 'دوگانه (بی‌سیم و با سیم)', value: 'both' },
      ],
      admin: {
        position: 'sidebar',
        condition: (data) => data.category === 8,
      },
    },
    {
      name: 'headphoneType',
      type: 'select',
      label: 'نوع هدفون / هدست',
      options: [
        { label: 'هدفون', value: 'headphone' },
        { label: 'هدست', value: 'headset' },
      ],
      admin: {
        condition: (data) => data.category === 8,
        position: 'sidebar',
      },
    },
    {
      name: 'headphoneUserType',
      type: 'select',
      label: 'نوع کاربری',
      options: [
        { label: 'گیمینگ', value: 'gaming' },
        { label: 'عادی', value: 'normal' },
        { label: 'بچه‌گانه و فانتزی', value: 'kids' },
      ],
      admin: {
        condition: (data) => data.category === 8,
        position: 'sidebar',
      },
    },
    // فیلدهای مخصوص ساعت هوشمند
    {
      name: 'smartWatchType',
      type: 'select',
      label: 'نوع ساعت هوشمند',
      options: [
        { label: 'هوشمند', value: 'smart' },
        { label: 'ورزشی', value: 'fit' },
      ],
      admin: {
        position: 'sidebar',
        condition: (data) => data.category === 6,
      },
    },
    // فیلدهای مشترک کاور و گلس: برند و مدل گوشی
    {
      name: 'phoneModel',
      type: 'text',
      label: 'مدل گوشی (برای کاور/گلس)',
      admin: {
        condition: (data) => data.category === 10 || data.category === 9,
        position: 'sidebar',
      },
    },
    slugField(),
  ],
})

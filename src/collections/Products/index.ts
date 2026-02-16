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
    { name: 'title',label: 'نام محصول', type: 'text', required: true },
    {
      name: 'price',
      label: 'قیمت ',
      type: 'number',
      required: true,
      admin: {
        description: 'قیمت محصول به تومان',
      },
    },
    {
      name: 'isOff',
      type: 'checkbox',
      label: 'دارای تخفیف',
      defaultValue: false,
    },
    {
      name: 'discountedPrice',
      type: 'number',
      label: 'قیمت با تخفیف',
      admin: {
        description: 'فقط زمانی نمایش داده می‌شود که تخفیف فعال باشد',
        condition: (data) => data?.isOff === true,
      },
    },
    {
      name: 'isFeatured',
      label: 'محصل شاخص',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'اگر میخواهید محصول مورد نظر درون صفحه اصلی نمایش داده شود انتخاب کنید',
      },
    },
    // {
    //   name: 'availableColors',
    //   type: 'array',
    //   label: 'رنگ‌های موجود',
    //   fields: [
    //     {
    //       name: 'colorName',
    //       label: 'نام رنگ',
    //       type: 'text',
    //       required: true,
    //     },
    //     {
    //       name: 'colorCode',
    //       label: 'کد رنگ',
    //       type: 'text',
    //       required: true,
    //     },
    //   ],
    // },
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
            // {
            //   name: 'layout',
            //   type: 'blocks',
            //   blocks: [CallToAction, Content, MediaBlock],
            // },
          ],
          label: 'محتوای محصول',
        },
        {
          fields: [
            ...defaultCollection.fields,
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
              }
            }),
            MetaDescriptionField({overrides: {
              label: 'توضیحات',
            }}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    // دسته‌بندی اصلی برای کنترل فیلدهای اختصاصی هر گروه
    {
      name: 'primaryCategory',
      type: 'select',
      label: 'دسته‌بندی اصلی',
      required: true,
      options: [
        { label: 'موبایل', value: 'mobile' },
        { label: 'اسپیکر', value: 'speaker' },
        { label: 'ساعت هوشمند', value: 'smart-watch' },
        { label: 'هندزفری', value: 'handsfree' },
        { label: 'هدفون / هدست', value: 'headphone' },
        { label: 'قاب / کاور', value: 'cover' },
        { label: 'گلس', value: 'glass' },
        { label: 'سایر', value: 'others' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    // برند مشترک بین همه دسته‌ها
    {
      name: 'brand',
      type: 'select',
      label: 'برند',
      options: [
        { label: 'اپل', value: 'apple' },
        { label: 'سامسونگ', value: 'samsung' },
        { label: 'شیائومی', value: 'xiaomi' },
      ],
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
        { label: '64 گیگابایت', value: "64" },
        { label: '128 گیگابایت', value: "128" },
        { label: '256 گیگابایت', value: '256' },
        { label: '512 گیگابایت', value: '512' },
        { label: '1 ترابایت', value: '1024' },
      ],
      admin: {
        condition: (data) => data?.primaryCategory === 'mobile',
        position: 'sidebar',
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
        condition: (data) => data?.primaryCategory === 'mobile',
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
        condition: (data) => data?.primaryCategory === 'speaker',
        position: 'sidebar',
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
        condition: (data) => data?.primaryCategory === 'handsfree',
        position: 'sidebar',
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
        condition: (data) => data?.primaryCategory === 'headphone',
        position: 'sidebar',
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
        condition: (data) => data?.primaryCategory === 'headphone',
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
        condition: (data) => data?.primaryCategory === 'headphone',
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
        condition: (data) => data?.primaryCategory === 'smart-watch',
        position: 'sidebar',
      },
    },
    // فیلدهای مشترک کاور و گلس: برند و مدل گوشی
    {
      name: 'phoneBrand',
      type: 'select',
      label: 'برند گوشی (برای کاور/گلس)',
      options: [
        { label: 'اپل', value: 'apple' },
        { label: 'سامسونگ', value: 'samsung' },
        { label: 'شیائومی', value: 'xiaomi' },
      ],
      admin: {
        condition: (data) =>
          data?.primaryCategory === 'cover' || data?.primaryCategory === 'glass',
        position: 'sidebar',
      },
    },
    {
      name: 'phoneModel',
      type: 'select',
      label: 'مدل گوشی (برای کاور/گلس)',
      options: [
        { label: 'Iphone 6', value: 'iphone-6' },
        { label: 'Iphone 6s', value: 'iphone-6s' },
        { label: 'Iphone 6 plus', value: 'iphone-6-plus' },
        { label: 'Iphone 6s plus', value: 'iphone-6s-plus' },
        { label: 'A16', value: 'a16' },
        { label: 'A26', value: 'a26' },
        { label: 'A36', value: 'a36' },
        { label: 'A56', value: 'a56' },
        { label: 'Redmi note 11', value: 'redmi-note-11' },
        { label: 'Redmi note 11s', value: 'redmi-note-11s' },
        { label: 'Redmi note 11 pro', value: 'redmi-note-11-pro' },
      ],
      admin: {
        condition: (data) =>
          data?.primaryCategory === 'cover' || data?.primaryCategory === 'glass',
        position: 'sidebar',
      },
    },
    slugField(),
  ],
})

import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

export const Variants: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  fields: [
    // keep all default fields, but localize labels
    ...defaultCollection.fields.map((field) => {
      if (field.name === 'title') {
        field.label = 'نام تنوع محصول'
        field.admin = {
          ...field.admin,
          description:
            'اطلاعات تنوع به اخر نام محصول اضافه خواهند شد لازم نیست چیزی اینجا وارد کنید',
        }
      }

      if (field.name === 'product') {
        field.label = 'محصول انتخاب شده'
      }

      return field
    }),

    // فیلدهای نمایشی تخفیف برای هر تنوع
            {
              name: 'isOff',
              label: 'دارای تخفیف',
              type: 'checkbox',
              admin: {
                description: 'اگه محصول مورد نظر دارای تخفیف است فعال کنید'
              },
              defaultValue: false
            },
            {
              name: 'discountedPrice',
              label: 'قمیت نهایی(با تخفیف)',
              type: 'number',
              admin: {
                description: 'اگر تخفیف فعال باشد از این قیمت برای پرداهت نهایی استفاده میشود.',
                condition: (data) => data.isOff
              }
            },
  ],
})

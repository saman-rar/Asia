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

    // فعال‌سازی و تنظیم قیمت این تنوع محصول
    {
      name: 'enablePrice',
      type: 'checkbox',
      label: 'فعال‌سازی قیمت برای این تنوع',
      admin: {
        description: 'اگر این تنوع قیمت متفاوتی با قیمت اصلی دارد فعال کنید اگرنه قیمت اصلی برای این تنوع اعمال خواهد شد'
      },
      defaultValue: false,
    },

    // custom per-variant IRR pricing fields
    {
      name: 'price',
      type: 'number',
      label: 'قیمت (IRR)',
      admin: {
        description: 'قیمت این تنوع محصول به تومان',
        condition: (data) => data?.enablePrice === true,
      },
    },
    {
      name: 'isOff',
      type: 'checkbox',
      label: 'دارای تخفیف',
      defaultValue: false,
      admin: {
        condition: (data) => data?.enablePrice === true,
      },
    },
    {
      name: 'discountedPrice',
      type: 'number',
      label: 'قیمت با تخفیف',
      admin: {
        description: 'فقط زمانی نمایش داده می‌شود که این تنوع تخفیف داشته باشد',
        condition: (data) => data?.enablePrice === true && data?.isOff === true,
      },
    },
  ],
})

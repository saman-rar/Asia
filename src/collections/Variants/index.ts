import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'

export const Variants: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  fields: defaultCollection.fields.map((field) => {
    if (field.name === 'title') {
      ;((field.label = 'نام تنوع محصول'),
        (field.admin.description =
          'نامی را برای نمایش این نوع خاص از محصول انتخاب شده وارد کنید برای مثال گوشی موبایل A56 رنگ آبی گارانتی آسیا'))
    }

    if (field.name === 'product') {
      field.label = 'محصول انتخاب شده'
    }

    return field
  }),
})

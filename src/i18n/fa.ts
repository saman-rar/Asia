import { fa as defaultFa } from '@payloadcms/translations/languages/fa'

export const fa = {
  ...defaultFa,
  'plugin-ecommerce': {
    //@ts-expect-error
    ...defaultFa['plugin-ecommerce'] ,
    variantOption: 'گزینه تنوع',
    variantOptions: 'گزینه‌های تنوع',
  },
}
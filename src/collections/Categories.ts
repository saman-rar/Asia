import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'دسته بندی',
    plural: 'دسته بندی‌ها',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
    group: 'Content',
  },
  fields: [
    {
      name: 'label',
      label: 'نام دسته بندی',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      label: 'شناسه انگلیسی',
      type: 'text',
      required: true,
    },
  ],
}

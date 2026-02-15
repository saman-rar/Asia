import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      label: 'Hero Slides',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
      ],
    },
    {
      name: 'promoGrid2x2',
      type: 'array',
      label: '2x2 Promo Grid Items',
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'promoGrid4x1',
      type: 'array',
      label: '4x1 Promo Grid Items',
      maxRows: 4,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link URL',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
  ],
}

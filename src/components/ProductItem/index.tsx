import { Media } from '@/components/Media'
import { cn } from '@/lib/utils'
import { Product, Variant } from '@/payload-types'
import { Badge } from '../ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

type Props = {
  product: Product
  style?: 'compact' | 'default'
  variant?: Variant
  quantity?: number
  className?: string
  /**
   * Force all formatting to a particular currency.
   */
  currencyCode?: string
}

export const ProductItem: React.FC<Props> = ({
  product,
  style = 'default',
  quantity,
  variant,
  currencyCode,
  className,
}) => {
  const { title } = product

  const metaImage =
    product.meta?.image && typeof product.meta?.image !== 'string' ? product.meta.image : undefined

  const firstGalleryImage =
    typeof product.gallery?.[0]?.image !== 'string' ? product.gallery?.[0]?.image : undefined

  let image = firstGalleryImage || metaImage

  const isVariant = Boolean(variant) && typeof variant === 'object'

  if (isVariant) {
    const imageVariant = product.gallery?.find((item) => {
      if (!item.variantOption) return false
      const variantOptionID =
        typeof item.variantOption === 'object' ? item.variantOption.id : item.variantOption

      const hasMatch = variant?.options?.some((option) => {
        if (typeof option === 'object') return option.id === variantOptionID
        else return option === variantOptionID
      })

      return hasMatch
    })

    if (imageVariant && typeof imageVariant.image !== 'string') {
      image = imageVariant.image
    }
  }

  const itemPrice = variant?.priceInUSD || product.priceInUSD
  const itemURL = `/products/${product.slug}${variant ? `?variant=${variant.id}` : ''}`

  return (
    <Card className={cn('pt-0 pb-1 px-0 overflow-hidden', className)}>
      <div className="flex items-stretch justify-stretch h-30 aspect-square">
        <div className="relative w-full h-full">
          {image && typeof image !== 'string' && (
            <Media className="" fill imgClassName="object-cover" resource={image} />
          )}
        </div>
      </div>
      <CardHeader className="px-2">
        <CardTitle className="text-sm">{product.meta?.title}</CardTitle>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-1">
            <Badge className="bg-blue-600 text-white flex pt-1.5">50%</Badge>
            <span className="text-muted-foreground text-xs line-through pt-1.5">
              {product.price}
            </span>
          </div>
          <div className="text-md font-bold text-card-foreground">{product.price} تومان</div>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

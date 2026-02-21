import { Media } from '@/components/Media'
import { cn, getFaNumber } from '@/lib/utils'
import { Product, Variant } from '@/payload-types'
import Link from 'next/link'
import { Price } from '../Price'
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

export const ProductItem: React.FC<Props> = ({ product, variant, className }) => {
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

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className={cn('pt-0 pb-3 px-0 overflow-hidden', className)}>
        <div className="flex items-stretch justify-stretch h-40 w-full">
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
              <Badge className="bg-blue-600 text-white flex pt-1.5">
                {getFaNumber(
                  ((product.discountedPrice as number) / (product.priceInIRR as number)) * 100,
                )}
                %
              </Badge>
              <Price
                amount={product.priceInIRR as number}
                className="text-muted-foreground text-xs line-through pt-1.5"
              />
            </div>
            <Price
              amount={product.discountedPrice as number}
              className="text-md font-bold text-card-foreground"
            />
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

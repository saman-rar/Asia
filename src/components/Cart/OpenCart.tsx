import { Button } from '@/components/ui/button'
import { getFaNumber } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '../ui/badge'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <>
      {/* Desktop */}
      <Button
        variant="ghost"
        size="clear"
        className="hidden lg:flex group justify-center items-center hover:cursor-pointer w-12 h-12 text-primary-light/75 hover:text-primary-light transition duration-150 ease-in hover:bg-secondary"
        {...rest}
      >
        <ShoppingCart className="scale-150 rotate-y-180" />

        {quantity ? (
          <Badge className="bg-primary-light/60 group-hover:bg-primary-light transition duration-150 ease-in rounded-full aspect-square text-white pt-1">
            {getFaNumber(quantity)}
          </Badge>
        ) : null}
      </Button>

      {/* Mobile */}
      <ShoppingCart className="scale-80 lg:hidden" />
    </>
  )
}

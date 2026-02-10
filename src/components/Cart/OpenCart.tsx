import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

export function OpenCartButton({
  className,
  quantity,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="ghost"
      size="clear"
      className="flex justify-center items-center hover:cursor-pointer w-12 h-12 text-primary/75 hover:text-primary transition duration-150 ease-in hover:bg-secondary"
      {...rest}
    >
      <ShoppingCart className="scale-150" />

      {quantity ? (
        <>
          <span>•</span>
          <span>{quantity}</span>
        </>
      ) : null}
    </Button>
  )
}

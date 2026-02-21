'use client'
import { getFaFormattedPrice } from '@/lib/utils'
import React from 'react'

type BaseProps = {
  className?: string
  currencyCodeClassName?: string
  as?: 'span' | 'p'
}

type PriceFixed = {
  amount: number
  currencyCode?: string
  highestAmount?: never
  lowestAmount?: never
}

type PriceRange = {
  amount?: never
  currencyCode?: string
  highestAmount: number
  lowestAmount: number
}

type Props = BaseProps & (PriceFixed | PriceRange)

export const Price = ({ amount, className, as = 'p' }: Props & React.ComponentProps<'p'>) => {
  const Element = as

  if (typeof amount === 'number') {
    return (
      <Element className={className} suppressHydrationWarning>
        {getFaFormattedPrice(amount)} تومان
      </Element>
    )
  }

  return null
}

import { clsx, type ClassValue } from 'clsx'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFaFormattedPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 1,
  }).format(price)

  return formattedPrice
}

export function getFaNumber(num: number) {
  const formattedNumber = new Intl.NumberFormat('fa-IR', {
    maximumFractionDigits: 1,
    useGrouping: false,
  }).format(num)

  return formattedNumber
}

export function getNormalNumber(formattedNum: string) {
  const persianToEnglish = (s: string) =>
    s.replace(/[۰-۹]/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
  const normalizedValue = persianToEnglish(formattedNum)

  const rawValue = normalizedValue.replace(/\D/g, '')

  const normalNum = rawValue === '' ? 0 : Number(rawValue)

  return normalNum
}

export function createQueryString(
  queries: {
    key: string
    value: string
    replace?: boolean
  }[],
  searchParams: ReadonlyURLSearchParams,
) {
  const params = new URLSearchParams(searchParams.toString())

  queries.map((query) => {
    const isExisted = searchParams.getAll(query.key).includes(query.value)

    if (isExisted) {
      return params.delete(query.key, query.value)
    }

    if (query.replace) {
      params.set(query.key, query.value)
    } else {
      params.append(query.key, query.value)
    }
  })

  return params.toString()
}

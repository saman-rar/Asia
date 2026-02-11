'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'

import type { Header } from 'src/payload-types'

import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/cn'
import { LogIn, Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button, buttonVariants } from '../ui/button'
import SearchBar from './SearchBar'

type Props = {
  header: Header
}

const categories = ['همه', 'موبایل', 'اسپیکر', 'هندزفری', 'قاب و گلس']

export function HeaderClient({ header }: Props) {
  const [showCategories, setShowCategories] = useState(true)
  const lastScrollY = useRef(0)
  const { theme, setTheme } = useTheme()
  const menu = header.navItems || []
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current) {
        setShowCategories(false)
      } else {
        setShowCategories(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'sticky top-0 right-0 left-0 bg-background transition-all duration-300 ease-in-out z-20',
        {
          'border-b border-gray-300 dark:border-white/20 shadow-md pb-1': !showCategories,
        },
      )}
    >
      <div className="sticky top-0 right-0 left-0 z-20">
        <nav className="flex items-center md:items-end justify-between container pt-2">
          {/* Desktop nav */}
          <div className="flex-col w-full flex">
            <div className="flex gap-5 w-full items-center justify-between">
              {/* Logo */}
              <div className="flex w-full items-end md:w-1/3">
                <Link className="flex w-full items-center ms-2 pt-4 pb-4 md:w-auto" href="/">
                  <div className="text-2xl text-primary">موبایل آسیا</div>
                </Link>
                {menu.length ? (
                  <ul className="hidden gap-4 text-sm md:flex md:items-center">
                    {menu.map((item) => (
                      <li key={item.id}>
                        <CMSLink
                          {...item.link}
                          size={'clear'}
                          className={cn('relative navLink', {
                            active:
                              item.link.url && item.link.url !== '/'
                                ? pathname.includes(item.link.url)
                                : false,
                          })}
                          appearance="nav"
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {/* Search bar */}
              <div className="md:pb-2 w-full md:w-auto">
                <SearchBar />
              </div>
              {/* Cart & Theme & Login */}
              <div className="flex justify-end md:w-1/3 gap-4 items-center">
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    className:
                      'h-12 hidden! lg:flex! transition! duration-150! ease-in! group hover:bg-primary! text-primary! hover:text-white! dark:hover:text-black!',
                  })}
                  href="/signup"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LogIn className="scale-120" />
                    <span>ورود | ثبت نام</span>
                  </div>
                </Link>
                <Link
                  className={buttonVariants({
                    variant: 'secondary',
                    className:
                      'h-12 hidden! md:flex! lg:hidden! transition! duration-150! ease-in! group hover:bg-primary! text-primary! hover:text-white! dark:hover:text-black!',
                  })}
                  href="/signup"
                >
                  <div className="flex items-center justify-center gap-3">
                    <LogIn className="scale-150" />
                  </div>
                </Link>
                <Button
                  variant="secondary"
                  className="flex justify-center items-center hover:cursor-pointer md:w-12 md:h-12 text-primary transition duration-150 ease-in hover:bg-primary hover:text-white dark:hover:text-black"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                >
                  {theme === 'light' ? (
                    <Moon className="md:scale-150" />
                  ) : (
                    <Sun className="md:scale-150" />
                  )}
                </Button>
                <Suspense fallback={<OpenCartButton className="hidden! md:flex!" />}>
                  <Cart />
                </Suspense>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* categories */}
      <ul
        className={cn(
          'absolute inset-x-0 top-17 transition-all duration-300 ease-in-out will-change-transform border-b border-gray-300 dark:border-white/20 shadow-md bg-background',
          {
            '-translate-y-10 opacity-0 pointer-events-none': !showCategories,
            'translate-y-0 opacity-100': showCategories,
          },
        )}
      >
        <div className="container flex md:gap-5 pt-2">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href="/"
                className={buttonVariants({
                  variant: 'nav',
                  className: 'navLink text-muted-foreground!',
                })}
              >
                {category}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  )
}

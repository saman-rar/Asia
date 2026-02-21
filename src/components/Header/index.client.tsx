'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Link from 'next/link'
import { Suspense, useEffect, useRef, useState } from 'react'

import { Category } from '@/payload-types'
import { useTheme } from '@/providers/Theme'
import { cn } from '@/utilities/cn'
import { Home, LogIn, Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { CartModal } from '../Cart/CartModal'
import { Button, buttonVariants } from '../ui/button'
import { CategoryModal } from './CategoryModal'
import SearchBar from './SearchBar'
import './index.css'

interface HeaderProps {
  categories: Category[]
}

export function HeaderClient({ categories }: HeaderProps) {
  const [showCategories, setShowCategories] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const activeCategory = pathname.split('/').filter(Boolean)[0] || 'home'

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
        'sticky top-0 right-0 left-0 bg-background transition-all duration-300 ease-in-out z-50 border-b lg:border-none border-gray-300 dark:border-white/20 shadow-md',
        {
          'border-b': !showCategories,
        },
      )}
    >
      <div className="sticky top-0 right-0 left-0 z-20">
        <nav className="flex items-center md:items-end justify-between container pt-0 lg:pt-2">
          {/* Desktop nav */}
          <div className="flex-col w-full flex">
            <div className="flex gap-5 w-full items-center justify-between">
              {/* Logo */}
              <div className="flex w-full items-end md:w-1/3">
                <Link className="flex w-full items-center ms-2 pt-4 pb-4 md:w-auto" href="/">
                  <div className="text-2xl text-primary-light">موبایل آسیا</div>
                </Link>
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
                  href="/auth"
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
                <div className="hidden lg:block">
                  <Suspense fallback={<OpenCartButton className="hidden! lg:flex!" />}>
                    <Cart />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* categories */}
      {/* Desktop Categories */}
      <ul
        className={cn(
          'absolute overflow-x-auto hidden lg:block inset-x-0 top-17 transition duration-300 ease-in-out will-change-transform border-b border-gray-300 dark:border-white/20 shadow-md bg-background',
          {
            '-translate-y-10 opacity-0 pointer-events-none': !showCategories,
            'translate-y-0 opacity-100': showCategories,
          },
        )}
      >
        <div className="container flex md:gap-5 pt-2">
          <li>
            <Link
              href={`/`}
              className={buttonVariants({
                variant: 'nav',
                className: cn('navLink text-muted-foreground! hover:text-foreground!', {
                  'active text-foreground': 'home' === activeCategory,
                }),
              })}
            >
              صفحه اصلی
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/${category.name}`}
                className={buttonVariants({
                  variant: 'nav',
                  className: cn('navLink text-muted-foreground! hover:text-foreground!', {
                    'active text-foreground': category.name === activeCategory,
                  }),
                })}
              >
                {category.label}
              </Link>
            </li>
          ))}
        </div>
      </ul>
      {/* Mobile Categories */}
      <ul className="fixed bottom-0 right-0 left-0 flex lg:hidden items-center bg-background justify-between border-t">
        <li
          className={cn(
            'py-1.5 flex-1 cursor-pointer transition duration-150 hover:bg-secondary text-muted-foreground hover:text-foreground text-sm',
            {
              'text-foreground bg-secondary': activeCategory === 'home',
            },
          )}
        >
          <Link href="/home">
            <div className="flex flex-col items-center">
              <Home className="scale-80" />
              <span>خانه</span>
            </div>
          </Link>
        </li>
        <li
          className={cn(
            'py-1.5 flex-1 border-l border-r cursor-pointer transition duration-150 hover:bg-secondary text-muted-foreground hover:text-foreground text-sm',
            {
              'text-foreground bg-secondary': isCategoryOpen,
            },
          )}
        >
          <div className="flex flex-col items-center">
            <CategoryModal
              isOpen={isCategoryOpen}
              setIsOpen={setIsCategoryOpen}
              categories={categories}
            />
            <span>دسته بندی</span>
          </div>
        </li>
        <li
          className={cn(
            'py-1.5 flex-1 cursor-pointer transition duration-150 hover:bg-secondary text-muted-foreground hover:text-foreground text-sm',
            {
              'text-foreground bg-secondary': isCartOpen,
            },
          )}
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <div className="flex flex-col items-center">
            <CartModal customIsOpen={isCartOpen} setCustomIsOpen={setIsCartOpen} />
            <span>سبد خرید</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

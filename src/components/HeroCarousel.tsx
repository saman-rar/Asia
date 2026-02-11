'use client'

import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>(undefined)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  return (
    <div className="relative group">
      <Carousel
        className="w-full relative"
        opts={{
          direction: 'rtl',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={(api) => {
          setApi(api)
          setCount(api?.scrollSnapList().length ?? 0)
          setCurrent(api?.selectedScrollSnap() ?? 0)

          api?.on('select', () => {
            setCurrent(api.selectedScrollSnap())
          })
        }}
      >
        <CarouselContent>
          <CarouselItem className="relative w-full h-50">
            <Image src="/grid.png" fill alt="grid" />
          </CarouselItem>
          <CarouselItem className="relative w-full h-50">
            <Image src="/grid.png" fill alt="grid" />
          </CarouselItem>
          <CarouselItem className="relative w-full h-50">
            <Image src="/grid.png" fill alt="grid" />
          </CarouselItem>
          <CarouselItem className="relative w-full h-50">
            <Image src="/grid.png" fill alt="grid" />
          </CarouselItem>
        </CarouselContent>
        <div className="absolute bottom-7 start-15 space-x-1.5">
          <Button
            variant="secondary"
            onClick={() => api?.scrollPrev()}
            className="w-10 h-10 rounded-full opacity-0 transition duration-150 ease-in group-hover:opacity-100"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="secondary"
            onClick={() => api?.scrollNext()}
            className="w-10 h-10 rounded-full opacity-0 transition duration-150 ease-in group-hover:opacity-100"
          >
            <ChevronLeft />
          </Button>
        </div>
      </Carousel>
      {/* Dots */}
      <div className="absolute bottom-3 right-0 left-0">
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn('h-3 w-3 rounded-full transition-all bg-card-foreground', {
                'bg-card w-5': i === current,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default HeroCarousel

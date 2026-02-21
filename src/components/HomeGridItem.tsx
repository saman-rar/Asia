import { Media as MediaType } from '@/payload-types'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Media } from './Media'

interface HomeGridItemProps {
  item: {
    image: number | MediaType
    link?: string | null
    label?: string | null
    id?: string | null
  }
  aspect: string
}

const HomeGridItem = ({ item, aspect }: HomeGridItemProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
      <Media
        resource={item.image}
        className="relative h-full w-full object-cover transition-transform duration-400 group-hover:scale-110"
        imgClassName={`h-full w-full object-cover ${aspect}`}
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {item.label}
        </h3>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          <Link
            href={item.link as string}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary border border-border text-background rounded-lg text-xs md:text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
            مشاهده
          </Link>
        </div>
      </div>
    </div>
  )
}
export default HomeGridItem

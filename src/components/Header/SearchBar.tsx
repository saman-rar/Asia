import { createUrl } from '@/utilities/createUrl'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log('first')

    const val = e.target as HTMLFormElement
    const search = val.search as HTMLInputElement
    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/products', newParams))
  }
  return (
    <>
      <form onSubmit={onSubmit} className="hidden md:block">
        <div className="bg-secondary flex items-center gap-2 py-3 px-6 rounded-xl focus-within:ring-1 focus-within:ring-neutral-300">
          <button type="submit">
            <Search className="text-foreground/50 cursor-pointer" />
          </button>
          <input
            type="text"
            className="ring-0! py-1 px-2"
            defaultValue={searchParams?.get('q') || ''}
            key={searchParams?.get('q')}
            name="search"
          />
        </div>
      </form>
      <Button type="submit" variant="secondary" className="md:hidden w-full justify-end">
        <Search className="text-primary" />
      </Button>
    </>
  )
}
export default SearchBar

import { Search } from 'lucide-react'
import { Button } from '../ui/button'

const SearchBar = () => {
  return (
    <>
      <form action="" className="hidden md:block">
        <div className="bg-secondary flex items-center gap-2 py-3 px-6 rounded-xl focus-within:ring-1 focus-within:ring-neutral-300">
          <Search className="text-foreground/50 cursor-pointer" />
          <input type="text" className="ring-0! py-1 px-2" />
        </div>
      </form>
      <Button variant="secondary" className="md:hidden w-full justify-end">
        <Search className="text-primary" />
      </Button>
    </>
  )
}
export default SearchBar

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon } from './icons'

export default function SearchBar({
  initialValue = '',
  size = 'md',
  autoFocus = false,
  onSubmit,
}) {
  const [value, setValue] = useState(initialValue)
  const navigate = useNavigate()

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const padded =
    size === 'lg' ? 'px-4 py-3 pl-11 text-base' : 'px-3.5 py-2.5 pl-10 text-sm'
  const iconSize = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

  function handleSubmit(e) {
    e.preventDefault()
    const q = value.trim()
    if (onSubmit) {
      onSubmit(q)
    } else if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-3">
        <SearchIcon className={iconSize} />
      </span>
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products, brands, companies, ingredients…"
        aria-label="Search products"
        className={`input pl-10 ${padded}`}
      />
    </form>
  )
}
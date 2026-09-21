import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { MenuIcon, CloseIcon, SearchIcon } from './icons'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
]

function Logo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:gap-2"
      aria-label="FoodBuddy — home"
    >
      <img
        src="/logo.png"
        alt=""
        width={44}
        height={31}
        loading="eager"
        decoding="async"
        className="h-9 w-auto object-contain sm:h-11"
      />
      <img
        src="/logo_name.png"
        alt="FoodBuddy"
        width={122}
        height={23}
        loading="eager"
        decoding="async"
        className="h-5 w-auto object-contain sm:h-8"
      />
    </Link>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      const input = searchRef.current.querySelector('input')
      if (input) input.focus()
    }
  }, [searchOpen])

  function handleSearch(q) {
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  const nav = (mobile = false) => (
    <nav aria-label="Main navigation">
      <ul className={mobile ? 'flex flex-col' : 'flex items-center gap-1'}>
        {NAV_LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  mobile ? 'block' : ''
                } ${
                  isActive
                    ? 'text-brand-300'
                    : 'text-ink-2 hover:bg-surface-2 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night-950">
      <div className="container-page">
        <div className="flex h-16 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="btn btn-ghost p-2 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <Logo />

          <div className="ml-2 hidden flex-1 md:block">
            <div className="mx-auto max-w-xl">
              <SearchBar size="md" onSubmit={handleSearch} />
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-1 md:flex">{nav()}</div>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="btn btn-ghost p-2 ml-auto md:hidden"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            <SearchIcon />
          </button>
        </div>

        {searchOpen && (
          <div className="border-t border-line py-3 md:hidden" ref={searchRef}>
            <SearchBar size="lg" autoFocus onSubmit={handleSearch} />
          </div>
        )}

        {/* MOBILE MENU — slides in from the left as an overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${
            mobileOpen ? '' : 'pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div
            className={`absolute inset-0 bg-night-950/85 transition-opacity duration-300 ${
              mobileOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-night-950 p-4 transition-transform duration-300 ${
              mobileOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="btn btn-ghost p-2"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>
            {nav(true)}
          </div>
        </div>
      </div>
    </header>
  )
}
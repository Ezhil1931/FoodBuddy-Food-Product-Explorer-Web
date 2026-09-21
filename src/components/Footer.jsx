import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/products', label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-night-950">
      <div className="container-page py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-sm text-center sm:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="FoodBuddy — home"
            >
              <img
                src="/logo.png"
                alt=""
                width={44}
                height={31}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain sm:h-16"
              />
              <img
                src="/logo_name.png"
                alt="FoodBuddy"
                width={122}
                height={23}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto object-contain sm:h-9"
              />
            </Link>
            <p className="mt-3 text-sm text-ink-3">
              A catalog of packed-food products focused on ingredients and
              nutrition. Information only — no purchases.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-2 transition hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row">
          <p>© {new Date().getFullYear()} FoodBuddy. All rights reserved.</p>
          <p>Made for learning &amp; product discovery.</p>
        </div>
      </div>
    </footer>
  )
}
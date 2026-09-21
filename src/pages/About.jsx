import { Link } from 'react-router-dom'
import breadcrumbs from '../utils/breadcrumbs'
import { ListIcon, ChartIcon, GlobeIcon, PackageIcon } from '../components/icons'

const FEATURES = [
  {
    icon: <PackageIcon className="h-6 w-6" />,
    title: 'Curated local catalog',
    text: 'Every product is stored locally in the bundled catalog — a hand-picked selection of packaged food with full ingredient and nutrition data.',
  },
  {
    icon: <ListIcon className="h-6 w-6" />,
    title: 'Ingredients in plain text',
    text: 'Read the full ingredient list of every product as easy-to-read plain text, with allergens, additives and traces, and copy it with one click.',
  },
  {
    icon: <ChartIcon className="h-6 w-6" />,
    title: 'Honest nutrition tables',
    text: 'Every product shows a clean nutrition table — energy, protein, carbs, sugar, fat, fiber and salt — per 100 g and per serving, plus the Nutri-Score.',
  },
  {
    icon: <GlobeIcon className="h-6 w-6" />,
    title: 'Country & brand at a glance',
    text: 'Each product shows its brand, origin, manufacturing places and the countries it is sold in, so you always know who stands behind it.',
  },
]

export default function About() {
  return (
    <div className="container-page py-8 sm:py-10">
      {breadcrumbs([{ label: 'Home', to: '/' }, { label: 'About' }])}

      <div className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          About FoodBuddy
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-2">
          FoodBuddy is a <span className="font-semibold text-ink">packaged-food ingredients &amp; nutrition browser</span> —
          a working website that helps people check what is really inside the
          packaged food they buy. It keeps its product data in a local,
          bundled catalog. It
          is not an e-commerce store. There is no buying, checkout or payment —
          only clear, readable and copyable product information.
        </p>
      </div>

      <section className="mt-10" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="text-xl font-bold text-ink">
          Our Mission
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-2">
          Ingredient lists and nutrition labels are small and hard to read on a
          package. Our mission is to make that information easy to find,
          understand and share — the full ingredient list and nutrition facts,
          the brand and origin, and where the product is sold, all on one clean
          page for every product.
        </p>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          What the site offers
        </h2>
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-line bg-night-900 p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-2 text-brand-300">
              {f.icon}
            </span>
            <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="mt-10" aria-labelledby="future-heading">
        <h2 id="future-heading" className="text-xl font-bold text-ink">
          Get started
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-2">
          Browse by category, search by name or ingredient, and open any product
          to read and copy its ingredients and nutrition information.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
          <Link to="/categories" className="btn btn-secondary">
            Browse Categories
          </Link>
        </div>
      </section>
    </div>
  )
}
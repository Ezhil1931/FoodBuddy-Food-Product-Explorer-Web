import { Link } from 'react-router-dom'
import { ArrowRightIcon } from './icons'

export default function CategoryCard({ category, productCount }) {
  return (
    <Link
      to={`/category/${category.tag}`}
      className="group flex items-center gap-4 rounded-2xl border border-line bg-night-900 p-3 transition hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-night-850 sm:h-20 sm:w-20">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-ink">{category.name}</h3>
        <p className="mt-0.5 truncate text-sm text-ink-3">
          {category.description}
        </p>
        <p className="mt-1 text-xs font-medium text-brand-300">
          {typeof productCount === 'number'
            ? `${productCount.toLocaleString() || productCount} ${
                productCount === 1 ? 'product' : 'products'
              }`
            : 'Counting products…'}
        </p>
      </div>
      <ArrowRightIcon className="h-5 w-5 shrink-0 text-ink-3 transition group-hover:translate-x-0.5 group-hover:text-brand-300" />
    </Link>
  )
}
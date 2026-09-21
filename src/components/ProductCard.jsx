import { Link } from 'react-router-dom'
import { tagToTitle } from '../data/store'
import { GlobeIcon } from './icons'

const NUTRI_COLORS = {
  a: 'bg-[#028040]',
  b: 'bg-[#88bb46]',
  c: 'bg-[#ffd500]',
  d: 'bg-[#ef8b00]',
  e: 'bg-[#e64b00]',
}

export default function ProductCard({ product, className = '' }) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-night-900 transition hover:border-line-strong ${className}`}
    >
      <Link
        to={`/products/${product.id}`}
        aria-label={`Open ${product.name}`}
        className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-night-850">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-3">
              No image
            </div>
          )}
          <span className="absolute left-2 top-2 max-w-[75%] truncate rounded-md bg-night-950/85 px-2 py-1 text-xs font-medium text-ink">
            {product.brand}
          </span>

          <div className="absolute right-2 top-2 flex gap-1.5">
            {product.nutriscore && (
              <span
                title="Nutri-Score"
                className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold uppercase text-white ${
                  NUTRI_COLORS[product.nutriscore.toLowerCase()] || 'bg-brand-600'
                }`}
              >
                {product.nutriscore}
              </span>
            )}
            {product.novaGroup && (
              <span
                title={`NOVA group ${product.novaGroup}`}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-night-950/85 text-[11px] font-bold text-brand-300"
              >
                {product.novaGroup}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="text-sm font-semibold leading-snug text-ink">
            {product.name}
          </h3>

          <p className="truncate text-xs text-ink-3">
            {product.primaryCategory ? tagToTitle(product.primaryCategory) : 'Packaged food'}
            {product.quantity ? ` · ${product.quantity}` : ''}
          </p>

          <div className="mt-auto flex items-center gap-1.5 border-t border-line pt-3 text-xs text-ink-2">
            <GlobeIcon className="h-3.5 w-3.5 shrink-0 text-brand-400" />
            <span className="truncate">
              {product.brands.length > 1
                ? `${product.brands[0]} +${product.brands.length - 1}`
                : product.brand}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
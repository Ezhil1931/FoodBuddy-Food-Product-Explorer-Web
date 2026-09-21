import CopyButton from './CopyButton'
import { ListIcon, LeafIcon, AlertIcon } from './icons'
import { tagToTitle } from '../data/store'

function Chips({ items, title, icon, color }) {
  const clean = items.filter(Boolean)
  if (!clean.length) return null
  return (
    <div className="mt-4">
      <p className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${color}`}>
        {icon}
        {title}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {clean.map((item, i) => (
          <span key={`${item}-${i}`} className="chip">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProductIngredients({ product }) {
  const text = product.ingredientsText

  return (
    <section className="rounded-2xl border border-line bg-night-900">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-brand-400">
          <ListIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-ink">Ingredients</h2>
          <span className="text-xs text-ink-2">Full ingredient list from the product label</span>
        </div>
        {text && (
          <CopyButton
            text={text}
            label="Copy Ingredients"
            className="px-3 py-1.5 text-xs"
          />
        )}
      </div>

      {text ? (
        <p className="px-5 py-5 text-[15px] leading-relaxed text-ink">{text}</p>
      ) : (
        <p className="px-5 py-5 text-sm text-ink-3">
          Ingredient list is not yet available for this product.
        </p>
      )}

      <div className="border-t border-line px-5 py-4">
        <Chips
          items={product.allergens.map(tagToTitle)}
          title="Allergens"
          icon={<AlertIcon className="h-3.5 w-3.5" />}
          color={'text-ink-2'}
        />
        <Chips
          items={product.additives.map(tagToTitle)}
          title="Additives"
          icon={<ListIcon className="h-3.5 w-3.5" />}
          color={'text-ink-2'}
        />
        <Chips
          items={product.tracesTags.map(tagToTitle)}
          title="Possible traces"
          icon={<LeafIcon className="h-3.5 w-3.5" />}
          color={'text-ink-2'}
        />
      </div>
    </section>
  )
}
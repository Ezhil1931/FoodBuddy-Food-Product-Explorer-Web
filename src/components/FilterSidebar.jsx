import { DIETARY_OPTIONS, getActiveFilterCount } from '../utils/filtering'
import { categories } from '../data/categories'

function CheckboxGroup({ legend, options, selected, onChange }) {
  function toggle(value) {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    onChange(next)
  }

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-ink">{legend}</legend>
      <div className="space-y-2">
        {options.map((opt) => {
          const checked = selected.includes(opt.value)
          return (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(opt.value)}
                className="h-4 w-4 rounded border-line-strong bg-night-900 text-brand-500 focus:ring-brand-500"
              />
              <span className="flex-1">{opt.label}</span>
              {typeof opt.count === 'number' && !isNaN(opt.count) && (
                <span className="text-xs text-ink-3">{opt.count}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function FilterSidebar({
  filters,
  onChange,
  products = [],
  className = '',
}) {
  const filterCount = getActiveFilterCount(filters)

  function set(type, value) {
    onChange({ ...filters, [type]: value })
  }

  function clearAll() {
    onChange({ categories: [], brands: [], dietary: [] })
  }

  const categoryOptions = categories.map((c) => ({
    value: c.tag,
    label: c.name,
  }))

  const brandOptions = [...new Set(products.map((p) => p.brand || ''))]
    .filter(Boolean)
    .sort()
    .map((b) => ({
      value: b,
      label: b,
      count: products.filter((p) => p.brand === b).length,
    }))

  return (
    <aside className={className} aria-label="Product filters">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <h2 className="text-base font-bold text-ink">Filters</h2>
        {filterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="rounded text-sm font-medium text-brand-300 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Clear all ({filterCount})
          </button>
        )}
      </div>

      <div className="mt-4 space-y-6">
        <CheckboxGroup
          legend="Category"
          options={categoryOptions}
          selected={filters.categories || []}
          onChange={(v) => set('categories', v)}
        />
        <CheckboxGroup
          legend="Dietary & Labels"
          options={DIETARY_OPTIONS}
          selected={filters.dietary || []}
          onChange={(v) => set('dietary', v)}
        />
        {brandOptions.length > 0 && (
          <CheckboxGroup
            legend="Brand (in results)"
            options={brandOptions}
            selected={filters.brands || []}
            onChange={(v) => set('brands', v)}
          />
        )}
      </div>

      <div className="mt-6">
        <button type="button" onClick={clearAll} className="btn btn-secondary w-full">
          Reset Filters
        </button>
      </div>
    </aside>
  )
}
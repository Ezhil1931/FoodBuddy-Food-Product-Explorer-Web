import CopyButton from './CopyButton'
import { ChartIcon } from './icons'

const NUTRIENT_ROWS = [
  { key: 'energy-kcal', label: 'Energy', unit: 'kcal' },
  { key: 'energy', label: 'Energy', unit: 'kJ' },
  { key: 'fat', label: 'Fat', unit: 'g' },
  { key: 'saturated-fat', label: 'Saturated fat', unit: 'g' },
  { key: 'carbohydrates', label: 'Carbohydrates', unit: 'g' },
  { key: 'sugars', label: 'Sugars', unit: 'g' },
  { key: 'fiber', label: 'Dietary fiber', unit: 'g' },
  { key: 'proteins', label: 'Proteins', unit: 'g' },
  { key: 'salt', label: 'Salt', unit: 'g' },
]

const LEVEL_COLORS = {
  low: 'text-[#028040]',
  moderate: 'text-[#cc9c00]',
  high: 'text-[#c60b0b]',
}

const NUTRI_COLORS = {
  a: 'bg-[#028040]',
  b: 'bg-[#88bb46]',
  c: 'bg-[#ffd500]',
  d: 'bg-[#ef8b00]',
  e: 'bg-[#e64b00]',
}

function num(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function formatVal(value) {
  const n = num(value)
  if (n === null) return '—'
  return n % 1 === 0 ? String(n) : n.toFixed(1)
}

export default function NutritionPanel({ product }) {
  const N = product.nutriments || {}
  const levels = product.nutrientLevels || {}
  const perServing = !!product.servingQuantity || !!product.servingSize

  const textLines = [
    `${product.name} — nutrition (per 100 g)`,
    NUTRIENT_ROWS.map(({ key, label }) => {
      const v100 = N[`${key}_100g`]
      const vs = N[`${key}_serving`]
      const unit = key === 'energy' ? 'kJ' : key === 'energy-kcal' ? 'kcal' : 'g'
      return `${label}: ${v100 != null ? v100 : '—'}${unit}${
        perServing && vs != null ? ` (serving: ${vs}${unit})` : ''
      }`
    }).join('\n'),
  ].join('\n')

  return (
    <section className="rounded-2xl border border-line bg-night-900">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-brand-400">
          <ChartIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-ink">Nutrition facts</h2>
          <span className="text-xs text-ink-2">
            Per 100 g{perServing ? ` · ${product.servingSize || 'per serving'}` : ''}
          </span>
        </div>
        <CopyButton text={textLines} label="Copy Nutrition" className="px-3 py-1.5 text-xs" />
      </div>

      <div className="px-5 py-4">
        {product.nutriscore && (
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold uppercase text-white ${
                NUTRI_COLORS[product.nutriscore.toLowerCase()] || 'bg-brand-600'
              }`}
            >
              {product.nutriscore}
            </span>
            <span className="text-xs text-ink-3">Nutri-Score</span>
            {product.novaGroup && (
              <>
                <span className="ms-2 text-ink-3">·</span>
                <span className="text-xs font-medium text-brand-300">
                  NOVA {product.novaGroup}
                </span>
                <span className="text-xs text-ink-3">processing level</span>
              </>
            )}
          </div>
        )}

        <div className="overflow-x-auto -mx-5 px-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
                <th className="py-2 text-left font-medium">Nutrient</th>
                <th className="py-2 text-right font-medium">Per 100 g</th>
                {perServing && <th className="py-2 text-right font-medium">Per serving</th>}
              </tr>
            </thead>
            <tbody>
              {NUTRIENT_ROWS.filter((row) => N[`${row.key}_100g`] != null).map((row) => {
                const v100 = formatVal(N[`${row.key}_100g`])
                const vs = num(N[`${row.key}_serving`])
                const level = levels[row.key]
                return (
                  <tr key={row.key} className="border-b border-line last:border-0">
                    <td className="py-2.5 text-ink-2">
                      <span className="flex items-center gap-2">
                        {row.label}
                        {level && (
                          <span
                            title={`Level: ${level}`}
                            className={`h-2 w-2 shrink-0 rounded-full ${LEVEL_COLORS[level] || ''}`}
                          />
                        )}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-medium text-ink">
                      {v100}
                      <span className="ml-1 text-xs font-normal text-ink-3">{row.unit}</span>
                    </td>
                    {perServing && (
                      <td className="py-2.5 text-right text-ink">
                        {vs == null ? '—' : formatVal(vs)}
                      </td>
                    )}
                  </tr>
                )
              })}
              {!NUTRIENT_ROWS.some((row) => N[`${row.key}_100g`] != null) && (
                <tr>
                  <td className="py-6 text-center text-sm text-ink-3">
                    Nutrition data is not yet available for this product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
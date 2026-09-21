import { useState } from 'react'

export default function ImageGallery({ name, images }) {
  const items = (images || []).filter((i) => i && i.src)
  const [active, setActive] = useState(0)
  const main = items[active] || items[0]
  const src = main && main.src

  if (!src) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-line bg-night-900 text-sm text-ink-3">
        No image available
      </div>
    )
  }

  return (
    <div>
      <div className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-night-900">
        <img
          src={src}
          alt={main.label ? `${name} — ${main.label}` : name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />
        {main.label && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-night-950/85 px-2 py-1 text-xs text-ink">
            {main.label}
          </span>
        )}
      </div>

      {items.length > 1 && (
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
          role="listbox"
          aria-label="Product images"
        >
          {items.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              role="option"
              aria-selected={i === active}
              aria-label={`${item.label || 'Image'} ${i + 1} of ${items.length}`}
              onClick={() => setActive(i)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-night-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                i === active
                  ? 'border-brand-500'
                  : 'border-line hover:border-line-strong'
              }`}
            >
              <img
                src={item.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
import { useRef, useState, useEffect } from 'react'
import { SORT_OPTIONS } from '../utils/filtering'
import { ChevronDownIcon, CheckIcon } from './icons'

export default function SortSelect({ value, onChange, className = '' }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onDown)
    }
  }, [open])

  const current = SORT_OPTIONS.find((o) => o.id === value) || SORT_OPTIONS[0]

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="input flex w-full items-center justify-between gap-2 py-2.5"
      >
        <span className="truncate text-ink">
          Sort: <span className="font-medium text-brand-300">{current.label}</span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-ink-3 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Sort products"
          className="absolute right-0 z-50 mt-1 w-52 rounded-xl border border-line bg-night-950 p-1 shadow-xl shadow-night-950"
        >
          {SORT_OPTIONS.map((opt) => (
            <li key={opt.id} role="option" aria-selected={opt.id === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt.id)
                  setOpen(false)
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-surface-2 ${
                  opt.id === value ? 'font-medium text-brand-300' : 'text-ink'
                }`}
              >
                {opt.label}
                {opt.id === value && <CheckIcon className="h-4 w-4 shrink-0" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
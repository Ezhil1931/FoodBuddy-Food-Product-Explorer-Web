import { SearchIcon, AlertIcon, PackageIcon } from './icons'

export default function EmptyState({ title, description, children, kind = 'search' }) {
  const Icon = kind === 'search' ? SearchIcon : kind === 'error' ? AlertIcon : PackageIcon
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-night-900 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-brand-300">
        <Icon className="h-8 w-8" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 max-w-md text-sm text-ink-3">{description}</p>}
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '../components/icons'

export default function breadcrumbs(items) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.to ? (
              <Link
                to={item.to}
                className="rounded transition hover:text-brand-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="max-w-[12rem] truncate font-medium text-ink">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <ChevronRightIcon className="h-3.5 w-3.5 text-ink0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
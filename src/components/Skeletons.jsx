export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-night-900">
      <div className="aspect-[4/3] bg-night-850" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-night-850" />
        <div className="h-3 w-1/2 rounded bg-night-850" />
        <div className="mt-3 h-px bg-night-850" />
        <div className="h-4 w-2/3 rounded bg-night-850" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 8, className = '' }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
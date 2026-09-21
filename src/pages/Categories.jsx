import { categories } from '../data/categories'
import CategoryCard from '../components/CategoryCard'
import { useCategoryCounts, useTotalCount } from '../hooks/useCategoryCounts'
import breadcrumbs from '../utils/breadcrumbs'

export default function Categories() {
  const { counts, loading } = useCategoryCounts(categories.map((c) => c.tag))
  const total = useTotalCount()

  return (
    <div className="container-page py-8 sm:py-10">
      {breadcrumbs([
        { label: 'Home', to: '/' },
        { label: 'Categories' },
      ])}

      <div className="mt-6 border-b border-line pb-5">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">
          All Categories
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-3">
          Curated categories from our catalog. Browse a category to
          read ingredients and nutrition for every product in it.
          {total.count != null && (
            <>
              {' '}
              <span className="font-medium text-ink">
                {total.count.toLocaleString()}
              </span>{' '}
              products total.
            </>
          )}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <CategoryCard
            key={c.tag}
            category={c}
            productCount={loading ? undefined : counts[c.tag]}
          />
        ))}
      </div>
    </div>
  )
}
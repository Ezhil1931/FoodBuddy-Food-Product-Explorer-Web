import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import FilterSidebar from '../components/FilterSidebar'
import EmptyState from '../components/EmptyState'
import SortSelect from '../components/SortSelect'
import { GridSkeleton } from '../components/Skeletons'
import { useProducts } from '../hooks/useProducts'
import { getActiveFilterCount } from '../utils/filtering'
import { getCategory } from '../data/categories'
import breadcrumbs from '../utils/breadcrumbs'
import { PAGE_SIZE } from '../data/store'
import { FilterIcon, CloseIcon } from '../components/icons'

const EMPTY_FILTERS = { categories: [], brands: [], dietary: [] }

export default function Category() {
  const { category: tag } = useParams()
  const category = getCategory(tag)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sort, setSort] = useState('popular')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data, loading, error, refetch } = useProducts({
    tags: [tag],
    labels: filters.dietary,
    sort,
    page: 1,
  })

  const filterCount = getActiveFilterCount(filters)

  useEffect(() => {
    setFilters(EMPTY_FILTERS)
  }, [tag])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  if (!category) {
    return (
      <div className="container-page py-16">
        <EmptyState
          kind="error"
          title="Category not found"
          description="The category you are looking for does not exist or is not available in this catalog."
        >
          <Link to="/categories" className="btn btn-primary">
            Back to Categories
          </Link>
        </EmptyState>
      </div>
    )
  }

  const rawProducts = data?.products || []
  const brandFilter = filters.brands || []
  const products = brandFilter.length
    ? rawProducts.filter((p) => brandFilter.includes(p.brand))
    : rawProducts

  const drawer = (
    <FilterSidebar
      filters={filters}
      onChange={setFilters}
      products={rawProducts}
      className="rounded-2xl border border-line bg-night-900 p-5"
    />
  )

  return (
    <div className="container-page py-8 sm:py-10">
      {breadcrumbs([
        { label: 'Home', to: '/' },
        { label: 'Categories', to: '/categories' },
        { label: category.name },
      ])}

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-3">
            {category.description}{' '}
            {loading
              ? 'Fetching products…'
              : data && `${(data.count || 0).toLocaleString()} products found.`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="btn btn-secondary lg:hidden"
            aria-label="Open filters"
          >
            <FilterIcon className="h-4 w-4" />
            Filters
            {filterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-bold text-ink">
                {filterCount}
              </span>
            )}
          </button>
          <SortSelect value={sort} onChange={setSort} className="w-44" />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">{drawer}</div>

        <div>
          {loading ? (
            <GridSkeleton count={8} />
          ) : error ? (
            <EmptyState
              kind="error"
              title="Could not load products"
              description="Something went wrong while loading products. Please try again."
            >
              <button type="button" onClick={refetch} className="btn btn-primary">
                Try again
              </button>
            </EmptyState>
          ) : products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <EmptyState
              kind="search"
              title="No products available in this category"
              description="Try adjusting the filters to see more products."
            >
              <button
                type="button"
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="btn btn-secondary"
              >
                Clear filters
              </button>
            </EmptyState>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${drawerOpen ? '' : 'pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
      >
        <div
          className={`absolute inset-0 bg-night-950/85 transition-opacity duration-300 ${
            drawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto bg-night-950 p-4 transition-transform duration-300 ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Filters</h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="btn btn-ghost p-2"
              aria-label="Close filters"
            >
              <CloseIcon />
            </button>
          </div>
          {drawer}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => {
                setFilters(EMPTY_FILTERS)
                setDrawerOpen(false)
              }}
              className="btn btn-secondary flex-1"
            >
              Reset & close
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="btn btn-primary flex-1"
            >
              Show {data?.products.length ?? 0} results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
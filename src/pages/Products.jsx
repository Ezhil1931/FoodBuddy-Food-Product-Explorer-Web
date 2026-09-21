import { useState, useEffect, useRef } from 'react'
import ProductGrid from '../components/ProductGrid'
import FilterSidebar from '../components/FilterSidebar'
import EmptyState from '../components/EmptyState'
import SortSelect from '../components/SortSelect'
import { GridSkeleton } from '../components/Skeletons'
import { useProducts } from '../hooks/useProducts'
import { getActiveFilterCount } from '../utils/filtering'
import { PAGE_SIZE } from '../data/store'
import { FilterIcon, CloseIcon, ChevronRightIcon, ChevronLeftIcon } from '../components/icons'

const EMPTY_FILTERS = { categories: [], brands: [], dietary: [] }

export default function Products() {
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sort, setSort] = useState('popular')
  const [page, setPage] = useState(1)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerRef = useRef(null)

  const { data, loading, error, refetch } = useProducts({
    tags: filters.categories,
    labels: filters.dietary,
    sort,
    page,
  })

  const filterCount = getActiveFilterCount(filters)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  function changeFilters(next) {
    setPage(1)
    setFilters(next)
  }

  function changeSort(next) {
    setPage(1)
    setSort(next)
  }

  const rawProducts = data?.products || []
  const brandFilter = filters.brands || []
  const products = brandFilter.length
    ? rawProducts.filter((p) => brandFilter.includes(p.brand))
    : rawProducts

  const totalPages = Math.max(1, Math.ceil((data?.count || 0) / (data?.pageSize || PAGE_SIZE)))

  const drawer = (
    <FilterSidebar
      filters={filters}
      onChange={changeFilters}
      products={rawProducts}
      className="rounded-2xl border border-line bg-night-900 p-5"
    />
  )

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">All Products</h1>
          <p className="mt-1 text-sm text-ink-3">
            {loading
              ? 'Fetching products…'
              : data && `${(data.count || 0).toLocaleString()} products found`}
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
          <SortSelect value={sort} onChange={changeSort} className="w-44" />
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
            <>
              <ProductGrid products={products} />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPage={setPage}
                disabled={loading}
              />
            </>
          ) : (
            <EmptyState
              kind="search"
              title="No products found"
              description="Try removing some filters or browse a different category."
            >
              <button
                type="button"
                onClick={() => changeFilters(EMPTY_FILTERS)}
                className="btn btn-secondary"
              >
                Clear all filters
              </button>
            </EmptyState>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER — slides in from the left */}
      <div
        ref={drawerRef}
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

      {filterCount > 0 && (
        <div className="mt-6 hidden items-center gap-2 text-sm text-ink-3 lg:flex">
          <span>Active filters:</span>
          <button
            type="button"
            onClick={() => changeFilters(EMPTY_FILTERS)}
            className="font-medium text-brand-300 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

function Pagination({ page, totalPages, onPage, disabled }) {
  if (totalPages <= 1) return null
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="btn btn-secondary"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Previous
      </button>
      <span className="text-sm text-ink-2">
        Page <span className="font-semibold text-ink">{page}</span> of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages || disabled}
        onClick={() => onPage(page + 1)}
        className="btn btn-secondary"
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
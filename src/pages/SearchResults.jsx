import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import ProductGrid from '../components/ProductGrid'
import EmptyState from '../components/EmptyState'
import SortSelect from '../components/SortSelect'
import { GridSkeleton } from '../components/Skeletons'
import { Link } from 'react-router-dom'
import { useSearchFullText } from '../hooks/useSearchFullText'

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [sort, setSort] = useState('popular')
  const { data, loading, error, refetch } = useSearchFullText({ query, sort })

  useEffect(() => {
    document.title = query ? `Search: "${query}" — FoodBuddy` : 'Search — FoodBuddy'
    return () => {
      document.title = 'FoodBuddy — Ingredients & Nutrition Catalog'
    }
  }, [query])

  return (
    <div className="container-page py-8 sm:py-10">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">Search Results</h1>
      <p className="mt-1 text-sm text-ink-3">
        {query
          ? `Searching the catalog for “${query}”.`
          : 'Type a keyword to search the catalog.'}
      </p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="max-w-xl flex-1">
          <SearchBar
            size="lg"
            initialValue={query}
            onSubmit={(q) => {
              if (q) setSearchParams({ q })
            }}
          />
        </div>
        <div className="w-full sm:w-56">
          <SortSelect value={sort} onChange={setSort} className="w-full" />
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-3" aria-live="polite">
        {query && (
          <>
            {loading ? (
              'Searching…'
            ) : (
              <>
                <span className="font-semibold text-ink">
                  {(data?.count || 0).toLocaleString()}
                </span>{' '}
                {data?.count === 1 ? 'product' : 'products'} found for “{query}”
              </>
            )}
          </>
        )}
      </p>

      <div className="mt-4">
        {!query ? (
          <EmptyState
            kind="search"
            title="Enter a search term"
            description="Search by product name, brand, parent company, ingredient or tag — for example: chocolate."
          >
            <Link to="/products" className="btn btn-secondary">
              Browse all products
            </Link>
          </EmptyState>
        ) : loading ? (
          <GridSkeleton count={8} />
        ) : error ? (
          <EmptyState
            kind="error"
            title="Search is temporarily unavailable"
            description="Something went wrong while searching. Please try again."
          >
            <button type="button" onClick={refetch} className="btn btn-primary">
              Try again
            </button>
          </EmptyState>
        ) : data && data.products.length > 0 ? (
          <ProductGrid products={data.products} />
        ) : (
          <EmptyState
            kind="search"
            title="No products found"
            description={`Nothing matched “${query}”. Try another search term or browse categories instead.`}
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn btn-secondary">
                Browse all products
              </Link>
              <Link to="/categories" className="btn btn-primary">
                Explore categories
              </Link>
            </div>
          </EmptyState>
        )}
      </div>
    </div>
  )
}
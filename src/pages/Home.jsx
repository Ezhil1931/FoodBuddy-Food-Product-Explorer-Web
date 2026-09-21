import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'
import ProductGrid from '../components/ProductGrid'
import { categories } from '../data/categories'
import { useProducts } from '../hooks/useProducts'
import { useCategoryCounts, useTotalCount } from '../hooks/useCategoryCounts'
import { GridSkeleton } from '../components/Skeletons'
import { ArrowRightIcon, ListIcon, ChartIcon } from '../components/icons'

export default function Home() {
  const featured = useProducts({ sort: 'popular', page: 1, pageSize: 8 })
  const total = useTotalCount()
  const featuredTags = categories.slice(0, 6).map((c) => c.tag)
  const categoryCounts = useCategoryCounts(featuredTags)

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-line bg-night-950">
        <div className="container-page relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Know what&rsquo;s really inside your <span className="text-brand-400">packaged food</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-ink-2 sm:text-lg">
              Explore packaged food products from our catalog and read
              their full ingredient lists and nutrition information — in
              plain, easy-to-read text that you can copy with one click.
            </p>

            <div className="mt-7 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
              <Link to="/products" className="btn btn-primary">
                Explore Products
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <p className="text-sm text-ink-3">
                {total.count != null
                  ? `${total.count.toLocaleString()} products in the catalog`
                  : 'Loading product count…'}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-line pt-6 sm:justify-start">
              <div className="flex items-center gap-1.5 text-sm text-ink-2">
                <ListIcon className="h-4 w-4 text-brand-300" />
                Full ingredient lists
              </div>
              <span className="text-ink-3">·</span>
              <div className="flex items-center gap-1.5 text-sm text-ink-2">
                <ChartIcon className="h-4 w-4 text-brand-300" />
                Nutrition facts
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/photo-1512621776951-a57141f2eefd.jpg"
                alt="Fresh packed vegetables"
                loading="lazy"
                className="h-64 w-full rounded-2xl border border-line object-cover"
              />
              <img
                src="/images/photo-1550583724-b2692b85b150.jpg"
                alt="Packaged milk"
                loading="lazy"
                className="mt-8 h-64 w-full rounded-2xl border border-line object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page pt-14 sm:pt-16" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="categories-heading" className="text-2xl font-bold text-ink">
              Browse Categories
            </h2>
            <p className="mt-1 text-sm text-ink-3">
              Curated categories with product counts.
            </p>
          </div>
          <Link
            to="/categories"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-300 hover:underline sm:flex"
          >
            View all <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c) => (
            <CategoryCard
              key={c.tag}
              category={c}
              productCount={categoryCounts.counts[c.tag]}
            />
          ))}
        </div>
        <div className="mt-4 sm:hidden">
          <Link to="/categories" className="btn btn-secondary w-full">
            View all categories
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page pt-14 sm:pt-16" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between">
          <div>
            <h2 id="featured-heading" className="text-2xl font-bold text-ink">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-ink-3">
              Popular products from our catalog.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-300 hover:underline sm:flex"
          >
            All products <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6">
          {featured.loading ? (
            <GridSkeleton count={8} />
          ) : featured.error ? (
            <p className="rounded-2xl border border-line bg-night-900 px-5 py-8 text-center text-sm text-ink-3">
              Could not load products right now. Please try again in a moment.
            </p>
          ) : (
            <ProductGrid products={featured.data?.products || []} />
          )}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/products" className="btn btn-secondary w-full">
            Browse all products
          </Link>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-4 rounded-2xl border border-line bg-night-900 p-8 sm:grid-cols-3">
          <div className="text-center sm:text-left">
            <p className="text-2xl font-extrabold text-brand-400">
              {total.count != null ? `${total.count.toLocaleString()}+` : '…'}
            </p>
            <p className="mt-1 text-sm font-medium text-ink">Products in catalog</p>
            <p className="mt-1 text-sm text-ink-3">From our hand-picked grocery catalog.</p>
          </div>
          <div className="text-center sm:border-l sm:border-line sm:text-left sm:pl-6">
            <p className="text-2xl font-extrabold text-brand-400">{categories.length}</p>
            <p className="mt-1 text-sm font-medium text-ink">Categories</p>
            <p className="mt-1 text-sm text-ink-3">Snacks, beverages, dairy and more.</p>
          </div>
          <div className="text-center sm:border-l sm:border-line sm:text-left sm:pl-6">
            <p className="text-2xl font-extrabold text-brand-400">1-Click</p>
            <p className="mt-1 text-sm font-medium text-ink">Copy ingredients &amp; nutrition</p>
            <p className="mt-1 text-sm text-ink-3">
              Perfect for easier label reading anywhere.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
import { Link, useParams } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery'
import ProductIngredients from '../components/ProductIngredients'
import NutritionPanel from '../components/NutritionPanel'
import EmptyState from '../components/EmptyState'
import { useProduct } from '../hooks/useProduct'
import { tagToTitle } from '../data/store'
import breadcrumbs from '../utils/breadcrumbs'
import { ListIcon, GlobeIcon, MapPinIcon, InfoIcon, TagIcon, LeafIcon } from '../components/icons'

function InfoRow({ icon, label, values }) {
  const list = (values || []).filter(Boolean)
  if (!list.length) return null
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4 last:border-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-brand-400">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">{label}</p>
        <p className="mt-0.5 leading-snug text-ink">{list.join(', ')}</p>
      </div>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div className="aspect-square animate-pulse rounded-2xl border border-line bg-night-900" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 animate-pulse rounded bg-night-900" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-night-900" />
            <div className="h-32 animate-pulse rounded-2xl border border-line bg-night-900" />
            <div className="h-40 animate-pulse rounded-2xl border border-line bg-night-900" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          kind="error"
          title="Product not found"
          description={
            error
              ? 'Something went wrong while loading this product. Please try again.'
              : 'The product you are looking for is not available in the catalog.'
          }
        >
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="container-page py-6 sm:py-10">
      {breadcrumbs([
        { label: 'Home', to: '/' },
        { label: 'Products', to: '/products' },
        { label: product.name },
      ])}

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-12">
        {/* Sticky image on desktop */}
        <div className="lg:sticky lg:top-20">
          <ImageGallery name={product.name} images={product.images} />
        </div>

        <div className="min-w-0 space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
              {product.brand}
            </p>
            <h1 className="mt-1 text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {product.primaryCategory && (
                <span className="chip">{tagToTitle(product.primaryCategory)}</span>
              )}
              {product.quantity && <span className="chip">{product.quantity}</span>}
              {product.nutriscore && (
                <span className="chip">{`Nutri-Score ${product.nutriscore.toUpperCase()}`}</span>
              )}
              {product.novaGroup && <span className="chip">{`NOVA ${product.novaGroup}`}</span>}
            </div>

            {product.genericName && (
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                {product.genericName}
              </p>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-night-900">
            <InfoRow
              icon={<GlobeIcon className="h-5 w-5" />}
              label="Brands"
              values={product.brands}
            />
            <InfoRow
              icon={<MapPinIcon className="h-5 w-5" />}
              label="Country of origin"
              values={product.origins.length ? product.origins : product.countries}
            />
            <InfoRow
              icon={<MapPinIcon className="h-5 w-5" />}
              label="Manufacturing places"
              values={product.manufacturingPlaces}
            />
            <InfoRow icon={<GlobeIcon className="h-5 w-5" />} label="Selling in" values={product.countries} />
            <InfoRow icon={<TagIcon className="h-5 w-5" />} label="Stores" values={product.stores} />
            <InfoRow icon={<LeafIcon className="h-5 w-5" />} label="Labels" values={product.labels.map(tagToTitle)} />
            <InfoRow icon={<InfoIcon className="h-5 w-5" />} label="Packaging" values={[product.packaging]} />
            <InfoRow
              icon={<InfoIcon className="h-5 w-5" />}
              label="Data owner"
              values={[product.owner]}
            />
            {product.uniqueScans > 0 && (
              <InfoRow
                icon={<InfoIcon className="h-5 w-5" />}
                label="Unique scans"
                values={[product.uniqueScans.toLocaleString()]}
              />
            )}
          </div>

          <ProductIngredients product={product} />
          <NutritionPanel product={product} />

          {product.categoryTags.length > 0 && (
            <section className="rounded-2xl border border-line bg-night-900 p-5">
              <h2 className="flex items-center gap-2 text-base font-bold text-ink">
                <ListIcon className="h-5 w-5 text-brand-400" />
                Categories
              </h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.categoryTags.map((t) => (
                  <span key={t} className="chip">
                    {tagToTitle(t)}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
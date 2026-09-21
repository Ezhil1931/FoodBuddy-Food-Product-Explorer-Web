// Local data store.
// Exposes the same query API the hooks expect, but reads from the bundled
// catalog in `./products` instead of a remote service. Everything resolves
// instantly, so the site works fully offline.

import { products } from './products.js'

export const PAGE_SIZE = 24

export function tagToTitle(tag) {
  if (!tag) return ''
  const part = String(tag).split(':').pop() || String(tag)
  return part
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const GRADES = { a: 0, b: 1, c: 2, d: 3, e: 4 }

function sortProducts(list, sort) {
  const arr = [...list]
  switch (sort) {
    case 'name':
      arr.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      arr.sort((a, b) => (b.lastModifiedT || 0) - (a.lastModifiedT || 0))
      break
    case 'nutriscore':
      arr.sort(
        (a, b) =>
          (GRADES[(a.nutriscore || '').toLowerCase()] ?? 99) -
          (GRADES[(b.nutriscore || '').toLowerCase()] ?? 99),
      )
      break
    default: // popular
      arr.sort((a, b) => (b.uniqueScans || 0) - (a.uniqueScans || 0))
      break
  }
  return arr
}

function paginate(list, page, pageSize) {
  const start = (page - 1) * pageSize
  return {
    count: list.length,
    page,
    pageSize,
    products: list.slice(start, start + pageSize),
  }
}

/** Structured listing. Filters are catalog tag names (e.g. 'en:snacks'). */
export function searchProducts({
  tags = [],
  labels = [],
  sort = 'popular',
  page = 1,
  pageSize = PAGE_SIZE,
} = {}) {
  const filtered = products.filter(
    (p) =>
      (!tags.length || tags.some((t) => p.categoryTags.includes(t))) &&
      (!labels.length || labels.some((l) => p.labelsTags.includes(l))),
  )
  return Promise.resolve(paginate(sortProducts(filtered, sort), page, pageSize))
}

function textMatch(p, q) {
  const haystacks = [
    p.name,
    p.genericName,
    p.brand,
    ...(p.brands || []),
    ...(p.categoryTags || []).map(tagToTitle),
    ...((p.categoryTags || []).join(' ').split(':').map(tagToTitle)),
    p.ingredientsText,
    ...(p.labelsTags || []).map(tagToTitle),
    ...(p.labels || []),
    ...(p.allergens || []),
    ...(p.additives || []),
  ]
  return haystacks.some((s) => s && String(s).toLowerCase().includes(q))
}

/** Full-text search across names, brands, categories, ingredients and labels. */
export function searchFullText({
  query = '',
  sort = 'popular',
  page = 1,
  pageSize = PAGE_SIZE,
} = {}) {
  const q = String(query).trim().toLowerCase()
  if (!q) return Promise.resolve(paginate([], page, pageSize))
  const filtered = products.filter((p) => textMatch(p, q))
  return Promise.resolve(paginate(sortProducts(filtered, sort), page, pageSize))
}

/** Product detail by catalog code. */
export function getProduct(code) {
  return Promise.resolve(
    products.find((p) => p.code === code || p.id === code) || null,
  )
}

/** Number of products in a category tag. */
export function getCategoryCount(tag) {
  return Promise.resolve(
    products.filter((p) => p.categoryTags.includes(tag)).length,
  )
}

/** Total number of products in the catalog. */
export function getTotalCount() {
  return Promise.resolve(products.length)
}
// Sort + filter option definitions for the local catalog.

export const SORT_OPTIONS = [
  { id: 'popular', label: 'Popular' },
  { id: 'name', label: 'Name: A to Z' },
  { id: 'newest', label: 'Newest' },
  { id: 'nutriscore', label: 'Nutri-Score' },
]

export const DIETARY_OPTIONS = [
  { value: 'en:vegan', label: 'Vegan' },
  { value: 'en:vegetarian', label: 'Vegetarian' },
  { value: 'en:gluten-free', label: 'Gluten-free' },
  { value: 'en:no-palm-oil', label: 'Palm oil free' },
]

export function getActiveFilterCount(filters = {}) {
  const keys = ['categories', 'brands', 'dietary']
  return keys.reduce((total, key) => total + (filters[key]?.length || 0), 0)
}
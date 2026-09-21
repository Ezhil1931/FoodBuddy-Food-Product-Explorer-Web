// Formatting helpers.

export function formatWeight(product) {
  return `${product.weight} ${product.unit}`
}

export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
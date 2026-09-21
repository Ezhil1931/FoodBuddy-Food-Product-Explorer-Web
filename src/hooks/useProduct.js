import { useState, useEffect, useCallback } from 'react'
import { getProduct } from '../data/store'

export function useProduct(code) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getProduct(code)
      .then((res) => {
        if (!cancelled) setProduct(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [code])

  useEffect(() => load(), [load])

  return { product, loading, error }
}
import { useState, useEffect, useCallback } from 'react'
import { searchProducts } from '../data/store'

export function useProducts({ tags = [], labels = [], sort = 'popular', page = 1, pageSize } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    searchProducts({ tags, labels, sort, page, pageSize })
      .then((res) => {
        if (!cancelled) setData(res)
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
  }, [tags, labels, sort, page, pageSize])

  useEffect(() => refetch(), [refetch])

  return { data, loading, error, refetch }
}
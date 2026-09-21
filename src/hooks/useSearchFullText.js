import { useState, useEffect, useCallback } from 'react'
import { searchFullText } from '../data/store'

export function useSearchFullText({ query = '', sort = 'popular', page = 1, pageSize } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    searchFullText({ query, sort, page, pageSize })
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
  }, [query, sort, page, pageSize])

  useEffect(() => refetch(), [refetch])

  return { data, loading, error, refetch }
}
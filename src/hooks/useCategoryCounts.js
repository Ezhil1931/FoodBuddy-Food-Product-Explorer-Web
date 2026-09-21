import { useState, useEffect, useCallback } from 'react'
import { getCategoryCount, getTotalCount } from '../data/store'

export function useTotalCount() {
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getTotalCount()
      .then((n) => {
        if (!cancelled) setCount(n)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { count, loading }
}

export function useCategoryCounts(tags = []) {
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    Promise.all(
      tags.map((tag) =>
        getCategoryCount(tag)
          .then((n) => ({ tag, n }))
          .catch(() => ({ tag, n: null })),
      ),
    )
      .then((results) => {
        if (cancelled) return
        const next = {}
        results.forEach(({ tag, n }) => {
          next[tag] = n
        })
        setCounts(next)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [tags])

  useEffect(() => load(), [load])

  return { counts, loading, error }
}
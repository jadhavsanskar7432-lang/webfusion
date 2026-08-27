import { useState, useEffect, useRef } from 'react'
import { searchUnsplashImages } from '@/services/Unsplash'
import { getImageQuery, resourceImageOverrides } from '@/lib/imageQueryMap'

const hookCache = new Map()

export function useUnsplashImage(category, resourceId) {
  const [state, setState] = useState(() => {
    if (resourceId && resourceImageOverrides[resourceId]) {
      const override = resourceImageOverrides[resourceId]
      return {
        imageUrl: override.small,
        regularUrl: override.regular,
        photographer: override.photographer,
        photographerUrl: override.photographerUrl,
        loading: false,
        error: false,
      }
    }

    const cached = hookCache.get(category)
    if (cached) {
      return { ...cached, loading: false, error: false }
    }

    return {
      imageUrl: null,
      regularUrl: null,
      photographer: null,
      photographerUrl: null,
      loading: true,
      error: false,
    }
  })

  const fetchedRef = useRef(false)

  useEffect(() => {
    if (resourceId && resourceImageOverrides[resourceId]) {
      const override = resourceImageOverrides[resourceId]
      setState({
        imageUrl: override.small,
        regularUrl: override.regular,
        photographer: override.photographer,
        photographerUrl: override.photographerUrl,
        loading: false,
        error: false,
      })
      return
    }

    if (hookCache.has(category)) {
      const cached = hookCache.get(category)
      setState({ ...cached, loading: false, error: false })
      return
    }

    if (fetchedRef.current) return
    fetchedRef.current = true

    const query = getImageQuery(category)
    if (!query) {
      setState((prev) => ({ ...prev, loading: false, error: false }))
      return
    }

    let cancelled = false

    searchUnsplashImages(query, 1).then((results) => {
      if (cancelled) return

      if (results && results.length > 0) {
        const img = results[0]
        const value = {
          imageUrl: img.urls.small,
          regularUrl: img.urls.regular,
          photographer: img.photographer,
          photographerUrl: img.photographerUrl,
        }
        hookCache.set(category, value)
        setState({ ...value, loading: false, error: false })
      } else {
        setState((prev) => ({ ...prev, loading: false, error: true }))
      }
    })

    return () => {
      cancelled = true
    }
  }, [category, resourceId])

  return state
}

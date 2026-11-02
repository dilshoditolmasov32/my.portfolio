import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', notify)
      return () => mq.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Below 980px the design switches to its mobile layout. */
export const useNarrow = () => useMediaQuery('(max-width: 979px)')

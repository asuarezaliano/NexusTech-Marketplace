import { useEffect, RefObject } from 'react'

export function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (ref.current && !ref.current.contains(target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, handler, enabled])
}

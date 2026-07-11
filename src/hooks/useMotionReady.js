import { useEffect } from 'react'

export default function useMotionReady() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduced) {
      document.documentElement.classList.add('motion-ready')
    }
  }, [])
}

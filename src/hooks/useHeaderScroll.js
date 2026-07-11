import { useEffect, useState } from 'react'

export default function useHeaderScroll(threshold = 80) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.scrollY > threshold
  })

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

import { useCallback, useEffect, useState } from 'react'

export const THEME_STORAGE_KEY = 'goodsollar-theme'
export const THEME_CHANGE_EVENT = 'goodsollar-theme-change'

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

export function resolveTheme(stored = getStoredTheme()) {
  return stored ?? getSystemTheme()
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return

  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#060d18' : '#0D1B33')
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }))
  }
}

function readCurrentTheme() {
  if (typeof document === 'undefined') return 'light'
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' ? 'dark' : 'light'
}

export default function useTheme() {
  const [theme, setThemeState] = useState(readCurrentTheme)

  const setTheme = useCallback((nextTheme) => {
    const resolved = nextTheme === 'dark' ? 'dark' : 'light'
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced) {
      document.documentElement.classList.add('theme-transition')
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 320)
    }

    applyTheme(resolved)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, resolved)
    } catch {
      /* storage unavailable */
    }

    setThemeState(resolved)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  useEffect(() => {
    applyTheme(readCurrentTheme())

    function handleThemeChange(event) {
      const next = event.detail === 'dark' ? 'dark' : 'light'
      setThemeState(next)
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    return () => window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  }, [])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}

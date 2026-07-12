import { useCallback, useEffect, useState } from 'react'

export const THEME_STORAGE_KEY = 'goodsollar-theme'
export const THEME_CHANGE_EVENT = 'goodsollar-theme-change'
export const THEME_PREFERENCE_CHANGE_EVENT = 'goodsollar-theme-preference-change'

export function getSystemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' || stored === 'system'
      ? stored
      : null
  } catch {
    return null
  }
}

export function resolveTheme(stored = getStoredTheme()) {
  return stored === 'light' || stored === 'dark' ? stored : getSystemTheme()
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

function readCurrentPreference() {
  return getStoredTheme() ?? 'system'
}

export default function useTheme() {
  const [theme, setThemeState] = useState(readCurrentTheme)
  const [preference, setPreferenceState] = useState(readCurrentPreference)

  const setThemePreference = useCallback((nextPreference) => {
    const preferenceValue =
      nextPreference === 'light' || nextPreference === 'dark' ? nextPreference : 'system'
    const resolved = resolveTheme(preferenceValue)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced) {
      document.documentElement.classList.add('theme-transition')
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 320)
    }

    applyTheme(resolved)

    try {
      localStorage.setItem(THEME_STORAGE_KEY, preferenceValue)
    } catch {
      /* storage unavailable */
    }

    setThemeState(resolved)
    setPreferenceState(preferenceValue)
    window.dispatchEvent(
      new CustomEvent(THEME_PREFERENCE_CHANGE_EVENT, { detail: preferenceValue }),
    )
  }, [])

  const setTheme = useCallback(
    (nextTheme) => {
      setThemePreference(nextTheme)
    },
    [setThemePreference],
  )

  const toggleTheme = useCallback(() => {
    setThemePreference(theme === 'dark' ? 'light' : 'dark')
  }, [setThemePreference, theme])

  useEffect(() => {
    const currentPreference = readCurrentPreference()
    const resolved = resolveTheme(currentPreference)
    applyTheme(resolved)

    function handleThemeChange(event) {
      const next = event.detail === 'dark' ? 'dark' : 'light'
      setThemeState(next)
    }

    function handlePreferenceChange(event) {
      const next =
        event.detail === 'light' || event.detail === 'dark' ? event.detail : 'system'
      setPreferenceState(next)
    }

    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)')
    function handleSystemThemeChange() {
      if (readCurrentPreference() === 'system') {
        const next = getSystemTheme()
        applyTheme(next)
        setThemeState(next)
      }
    }

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    window.addEventListener(THEME_PREFERENCE_CHANGE_EVENT, handlePreferenceChange)
    systemQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
      window.removeEventListener(THEME_PREFERENCE_CHANGE_EVENT, handlePreferenceChange)
      systemQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  return {
    theme,
    preference,
    setTheme,
    setThemePreference,
    toggleTheme,
    isDark: theme === 'dark',
  }
}

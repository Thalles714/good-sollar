import { Check, Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import useTheme from '../../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { setThemePreference, preference, isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const menuId = useId()
  const label = 'Selecionar modo de aparência'
  const CurrentIcon = isDark ? Moon : Sun

  const options = [
    { value: 'light', label: 'Modo claro', icon: Sun },
    { value: 'dark', label: 'Modo escuro', icon: Moon },
    { value: 'system', label: 'Modo automático', icon: Monitor },
  ]

  useEffect(() => {
    if (!open) return undefined

    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`theme-switch ${className}`.trim()}>
      <button
        type="button"
        className="theme-switch-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        title={label}
      >
        <CurrentIcon className="h-[1.0625rem] w-[1.0625rem]" aria-hidden="true" />
        <span className="theme-switch-dot" aria-hidden="true" />
      </button>

      <div
        id={menuId}
        className={`theme-switch-menu ${open ? 'is-open' : ''}`}
        role="menu"
        aria-label="Opções de aparência"
      >
        {options.map((option) => {
          const Icon = option.icon
          const selected = preference === option.value

          return (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              className={`theme-switch-option ${selected ? 'is-selected' : ''}`}
              onClick={() => {
                setThemePreference(option.value)
                setOpen(false)
              }}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{option.label}</span>
              {selected && <Check className="ml-auto h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

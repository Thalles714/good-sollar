import { Moon, Sun } from 'lucide-react'
import useTheme from '../../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme()
  const label = isDark ? 'Ativar modo claro' : 'Ativar modo escuro'

  return (
    <button
      type="button"
      className={`theme-toggle btn-motion btn-motion-icon ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      {isDark ? (
        <Sun className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
      ) : (
        <Moon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  )
}

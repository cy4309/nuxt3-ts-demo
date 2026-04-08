type ThemeMode = 'light' | 'dark'

export const useTheme = () => {
  const mode = useState<ThemeMode>('theme-mode', () => 'light')

  const applyTheme = (next: ThemeMode) => {
    if (!import.meta.client) return
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }

  const initTheme = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme')
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const next: ThemeMode = saved === 'dark' || saved === 'light'
      ? saved
      : preferredDark
        ? 'dark'
        : 'light'

    mode.value = next
    applyTheme(next)
  }

  const setTheme = (next: ThemeMode) => {
    mode.value = next
    applyTheme(next)
  }

  const toggleTheme = () => {
    setTheme(mode.value === 'dark' ? 'light' : 'dark')
  }

  return {
    mode,
    initTheme,
    setTheme,
    toggleTheme
  }
}

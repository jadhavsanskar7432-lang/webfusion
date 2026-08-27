import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function getInitialTheme() {
  try {
    const stored = JSON.parse(localStorage.getItem('campus-circular-theme'))
    if (stored?.state?.theme) return stored.state.theme
  } catch (e) {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getInitialTheme(),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
    }),
    {
      name: 'campus-circular-theme',
    }
  )
)

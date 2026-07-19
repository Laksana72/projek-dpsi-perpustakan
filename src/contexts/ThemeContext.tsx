/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const STORAGE_KEY = 'library_theme'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored === 'dark' || stored === 'light') return stored
        return 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    )
}

function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within a ThemeProvider')
    return context
}

export { ThemeProvider, useTheme }
export type { Theme }

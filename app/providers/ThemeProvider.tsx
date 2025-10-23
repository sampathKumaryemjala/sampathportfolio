'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    try {
        return (localStorage.getItem('theme') as Theme) || 'system';
    } catch {
        return 'system';
    }
}

function getResolvedTheme(theme: Theme): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    
    if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme === 'dark' ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme);
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => getResolvedTheme(getInitialTheme()));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        
        const applyTheme = (isDark: boolean) => {
            if (isDark) {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
                root.classList.add('light');
            }
            setResolvedTheme(isDark ? 'dark' : 'light');
        };

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            applyTheme(mediaQuery.matches);

            const listener = (e: MediaQueryListEvent) => {
                applyTheme(e.matches);
            };

            mediaQuery.addEventListener('change', listener);
            return () => mediaQuery.removeEventListener('change', listener);
        } else {
            applyTheme(theme === 'dark');
        }
    }, [theme, mounted]);

    const setTheme = (newTheme: Theme) => {
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.error('Failed to save theme to localStorage:', e);
        }
        
        // Apply theme immediately
        const root = window.document.documentElement;
        if (newTheme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDark) {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
                root.classList.add('light');
            }
            setResolvedTheme(isDark ? 'dark' : 'light');
        } else {
            const isDark = newTheme === 'dark';
            if (isDark) {
                root.classList.add('dark');
                root.classList.remove('light');
            } else {
                root.classList.remove('dark');
                root.classList.add('light');
            }
            setResolvedTheme(isDark ? 'dark' : 'light');
        }
        
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}


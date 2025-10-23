'use client';

import { useTheme } from '@/app/providers/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        );
    }

    const themes = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ] as const;

    return (
        <div className="relative inline-flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
            {themes.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`
                        relative p-2 rounded-md transition-all duration-200
                        ${theme === value 
                            ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md' 
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }
                    `}
                    title={label}
                    aria-label={`Switch to ${label} mode`}
                >
                    <Icon className="w-4 h-4" />
                </button>
            ))}
        </div>
    );
}


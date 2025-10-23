"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/app/reusableComponents/ui/ThemeToggle';
import { navigationConfig, isDropdown, primaryCTA } from '@/config/navigation';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 sticky top-0 z-50 transition-colors duration-200">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                        SampathYemjala
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navigationConfig.map((item) => {
                            if (isDropdown(item)) {
                                return (
                                    <div key={item.label} className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm xl:text-base"
                                        >
                                            {item.label}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        {openDropdown === item.label && (
                                            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
                                                {item.items.map((subItem) => (
                                                    <Link
                                                        key={subItem.href}
                                                        href={subItem.href}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="block px-4 py-3 hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors group"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {subItem.icon && (
                                                                <span className="text-2xl mt-0.5">{subItem.icon}</span>
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                                                                    {subItem.label}
                                                                </div>
                                                                {subItem.description && (
                                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                                                        {subItem.description}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            
                            return (
                            <Link
                                    key={item.href}
                                    href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm xl:text-base"
                            >
                                    {item.label}
                            </Link>
                            );
                        })}
                        <ThemeToggle />
                        <Link
                            href={primaryCTA.href}
                            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
                        >
                            {primaryCTA.label}
                        </Link>
                    </div>

                    {/* Mobile Menu Button and Theme Toggle */}
                    <div className="lg:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col space-y-2 pt-4">
                            {navigationConfig.map((item) => {
                                if (isDropdown(item)) {
                                    return (
                                        <div key={item.label}>
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                                                className="w-full flex items-center justify-between py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                            >
                                                <span>{item.label}</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            {openDropdown === item.label && (
                                                <div className="ml-4 mt-2 space-y-1">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                setOpenDropdown(null);
                                                            }}
                                                            className="block py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {subItem.icon && <span>{subItem.icon}</span>}
                                                                <span className="text-sm">{subItem.label}</span>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }
                                
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="block py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                            <Link
                                href={primaryCTA.href}
                                className="block py-2 px-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors text-center mt-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {primaryCTA.label}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
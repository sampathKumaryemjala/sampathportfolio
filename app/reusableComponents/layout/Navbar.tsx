"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/app/reusableComponents/ui/ThemeToggle';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/blog', label: 'Blog' },
        { href: '/portfolio', label: 'Portfolio' },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 sticky top-0 z-50 transition-colors duration-200">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                        SampathYemjala
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-sm xl:text-base"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <ThemeToggle />
                        <Link
                            href="/contact"
                            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg transition-colors font-medium text-sm sm:text-base"
                        >
                            Contact
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
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block py-2 px-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="block py-2 px-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors text-center mt-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
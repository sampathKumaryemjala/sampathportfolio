import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all';

    const variants = {
        primary: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100',
        outline: 'border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={buttonClass}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
};
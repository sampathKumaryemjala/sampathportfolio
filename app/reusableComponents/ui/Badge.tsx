import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
    children, 
    variant = 'default', 
    size = 'md',
    className = '' 
}) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';
    
    const variants = {
        default: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
        secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
        success: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
        warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
        error: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    
    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base'
    };
    
    const badgeClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
    
    return (
        <span className={badgeClass}>
            {children}
        </span>
    );
};
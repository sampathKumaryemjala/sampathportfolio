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
        default: 'bg-purple-100 text-purple-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800'
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
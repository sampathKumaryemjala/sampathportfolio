import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
    return (
        <div
            className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden transition-colors duration-200
        ${hover ? 'transition-all hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-900/70' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
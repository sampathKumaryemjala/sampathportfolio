'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorDisplayProps {
    error: Error & { digest?: string };
    reset: () => void;
    title?: string;
    message?: string;
    backLink?: string;
    backLinkText?: string;
    showHomeLink?: boolean;
}

export function ErrorDisplay({
    error,
    reset,
    title = 'Oops! Something went wrong',
    message,
    backLink,
    backLinkText = 'Go Back',
    showHomeLink = true
}: ErrorDisplayProps) {
    useEffect(() => {
        console.error('Error:', error);
    }, [error]);

    const displayMessage = message || error.message || 'An unexpected error occurred. Please try again.';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
            <div className="max-w-lg w-full">
                <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
                    <p className="text-gray-600 mb-6 text-sm">{displayMessage}</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => reset()}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                        >
                            Try Again
                        </button>
                        {backLink && (
                            <Link
                                href={backLink}
                                className="block w-full bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-all"
                            >
                                {backLinkText}
                            </Link>
                        )}
                        {showHomeLink && (
                            <Link
                                href="/"
                                className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                            >
                                Go Home
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


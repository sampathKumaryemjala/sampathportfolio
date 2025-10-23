'use client';

import { ErrorDisplay } from '@/app/reusableComponents/ui/ErrorDisplay';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <ErrorDisplay 
            error={error} 
            reset={reset} 
            title="Error Loading About Page"
            message="We encountered an error while loading the about page. Please try again."
        />
    );
}


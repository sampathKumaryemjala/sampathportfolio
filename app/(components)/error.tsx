'use client';

import { ErrorDisplay } from '../reusableComponents/ui/ErrorDisplay';

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
            title="Error Loading Page"
            message="Something went wrong while loading this page."
        />
    );
}


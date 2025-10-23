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
            title="Error Loading Dashboard"
            message="We couldn't load your dashboard. Please try again or check your connection."
        />
    );
}


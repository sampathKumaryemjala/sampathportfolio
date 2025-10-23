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
            title="Error Loading Portfolio"
            message="We couldn't load the portfolio items. Please try again."
        />
    );
}


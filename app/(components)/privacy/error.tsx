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
            title="Error Loading Privacy Policy"
            message="We encountered an error while loading the privacy policy. Please try again."
        />
    );
}


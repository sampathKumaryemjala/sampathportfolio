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
            title="Error Loading Blog Post"
            message="We couldn't load this blog post. It might not exist or there was an error."
            backLink="/blog"
            backLinkText="Back to Blog"
        />
    );
}


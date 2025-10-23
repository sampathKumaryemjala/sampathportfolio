'use client';

import { ErrorDisplay } from './reusableComponents/ui/ErrorDisplay';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <ErrorDisplay error={error} reset={reset} />;
}


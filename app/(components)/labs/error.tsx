'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '@/app/reusableComponents/layout/Layout';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Labs page error:', error);
  }, [error]);

  return (
    <Layout>
      <section className="py-20 bg-white dark:bg-gray-900 flex items-center justify-center px-4 min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-6xl sm:text-8xl mb-6">⚠️</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-base sm:text-lg">
            We encountered an error loading the labs page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={reset}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all inline-block"
            >
              Go Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}


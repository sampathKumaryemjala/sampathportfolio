import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-md w-full mx-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 p-8 text-center">
                    <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 mb-4">
                        404
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Page Not Found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 dark:hover:from-purple-600 dark:hover:to-blue-600 transition-all transform hover:scale-105"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}


import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">
                        404
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-600 mb-4 text-sm">
                        The page you're looking for doesn't exist in this section.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}


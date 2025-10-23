export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-96 mx-auto"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-48 mb-6"></div>
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-24 mb-2"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="space-y-3 mb-5">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


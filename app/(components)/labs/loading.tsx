import { Layout } from '@/app/reusableComponents/layout/Layout';

export default function Loading() {
  return (
    <Layout>
      {/* Header Skeleton */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="h-12 sm:h-16 bg-white/20 rounded-lg animate-pulse mx-auto max-w-md"></div>
            <div className="h-6 sm:h-8 bg-white/20 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
          </div>
        </div>
      </section>

      {/* Cards Grid Skeleton */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  {/* Icon Skeleton */}
                  <div className="bg-gray-300 dark:bg-gray-700 h-32 sm:h-40"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-4 sm:p-6 space-y-3">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mt-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}


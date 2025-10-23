'use client'

import { useRouter } from 'next/navigation';
import { labsItems } from '@/config/navigation';
import { Layout } from '@/app/reusableComponents/layout/Layout';

export default function LabsPage() {
  const router = useRouter();

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              🧪 Labs & Projects
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-indigo-100 dark:text-indigo-200 max-w-2xl mx-auto">
              Explore interactive demos, experiments, and learning projects. Each card represents a unique project showcasing different web development concepts and technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {labsItems.map((item, index) => (
              <div
                key={item.href}
                onClick={() => handleCardClick(item.href)}
                className="group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`
                }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-purple-900/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                  {/* Icon Section */}
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 p-6 sm:p-8 flex items-center justify-center group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-300">
                    <div className="text-5xl sm:text-6xl lg:text-7xl transform group-hover:scale-110 transition-transform duration-300">
                      {item.icon || '🔬'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {item.label}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                      {item.description || 'Explore this project'}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm group-hover:gap-2 transition-all duration-300">
                      <span>Explore</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {labsItems.length === 0 && (
            <div className="text-center py-16 sm:py-24">
              <div className="text-6xl sm:text-8xl mb-4">🔬</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Labs Available Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md mx-auto">
                Check back soon for exciting projects and experiments!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CSS for fadeInUp animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}


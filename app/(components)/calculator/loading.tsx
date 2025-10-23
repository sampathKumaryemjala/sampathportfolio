export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-pulse">
          <div className="h-12 bg-white/20 rounded w-64 mx-auto mb-3"></div>
          <div className="h-4 bg-white/10 rounded w-48 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 animate-pulse">
            <div className="mb-6 p-6 bg-gray-900/50 rounded-2xl h-[140px]"></div>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="h-20 bg-white/10 rounded-xl"></div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 animate-pulse">
            <div className="h-8 bg-white/20 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-white/5 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


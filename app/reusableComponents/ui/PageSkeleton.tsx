interface PageSkeletonProps {
    variant?: 'hero' | 'grid' | 'form' | 'content' | 'dashboard';
}

export function PageSkeleton({ variant = 'hero' }: PageSkeletonProps) {
    if (variant === 'hero') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
                            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'grid') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
                            <div className="h-6 bg-white/20 rounded-lg w-80 mx-auto animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="h-48 bg-gray-200 animate-pulse"></div>
                                    <div className="p-6 space-y-3">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'form') {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="h-12 bg-white/20 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
                            <div className="h-6 bg-white/20 rounded-lg w-96 mx-auto animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="space-y-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i}>
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                                            <div className={`h-${i === 4 ? '32' : '12'} bg-gray-200 rounded animate-pulse`}></div>
                                        </div>
                                    ))}
                                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'dashboard') {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow p-6">
                                <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse"></div>
                                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow p-6">
                                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // content variant
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="h-10 bg-white/20 rounded-lg w-3/4 mb-4 animate-pulse"></div>
                        <div className="h-6 bg-white/20 rounded-lg w-1/2 mb-4 animate-pulse"></div>
                        <div className="h-4 bg-white/20 rounded-lg w-1/4 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <div className="py-16">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i}>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        {i % 3 === 0 && <div className="h-8"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


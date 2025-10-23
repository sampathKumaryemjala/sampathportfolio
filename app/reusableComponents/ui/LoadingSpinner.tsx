interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    submessage?: string;
}

export function LoadingSpinner({ 
    size = 'md', 
    message = 'Loading',
    submessage = 'Please wait while we load the content...'
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-24 h-24'
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="text-center">
                <div className={`relative ${sizeClasses[size]} mx-auto mb-6`}>
                    <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h2 className={`${textSizeClasses[size]} font-bold text-gray-800 mb-2`}>{message}</h2>
                <p className="text-gray-600 text-sm">{submessage}</p>
            </div>
        </div>
    );
}


'use client';

import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Mail, Calendar, Settings, LogOut } from 'lucide-react';

export default function DashboardPage() {
    const { session, status, logout, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Still loading
        if (!isAuthenticated) router.push('/login'); // Not authenticated
    }, [isAuthenticated, status, router]);

    if (status === 'loading') {
        return (
            <Layout>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    const handleSignOut = () => {
        logout();
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="mb-8 sm:mb-12">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                Welcome back, {session?.user?.name || 'User'}!
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                                Here&apos;s your dashboard overview
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                            <Card>
                                <div className="p-4 sm:p-6 text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">12</div>
                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Projects</div>
                                </div>
                            </Card>
                            <Card>
                                <div className="p-4 sm:p-6 text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">8</div>
                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Blog Posts</div>
                                </div>
                            </Card>
                            <Card>
                                <div className="p-4 sm:p-6 text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">24</div>
                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Messages</div>
                                </div>
                            </Card>
                            <Card>
                                <div className="p-4 sm:p-6 text-center">
                                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">95%</div>
                                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Satisfaction</div>
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                            {/* Profile Card */}
                            <Card className="lg:col-span-1">
                                <div className="p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                                                <div className="font-semibold text-gray-900 dark:text-white">{session?.user?.name || 'User'}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                                                <div className="font-semibold text-gray-900 dark:text-white">{session?.user?.email || 'user@example.com'}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                            <div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">Member since</div>
                                                <div className="font-semibold text-gray-900 dark:text-white">January 2025</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full mt-6 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </Card>

                            {/* Recent Activity */}
                            <Card className="lg:col-span-2">
                                <div className="p-6 sm:p-8">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">New project created</div>
                                                <div className="text-xs text-gray-500">2 hours ago</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">Blog post published</div>
                                                <div className="text-xs text-gray-500">1 day ago</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">Profile updated</div>
                                                <div className="text-xs text-gray-500">3 days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card className="mt-6 sm:mt-8">
                            <div className="p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <button className="flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                        <Settings className="w-5 h-5 text-purple-600" />
                                        <span className="text-sm font-semibold text-purple-700">Settings</span>
                                    </button>
                                    
                                    <button className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                        <User className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm font-semibold text-blue-700">Edit Profile</span>
                                    </button>
                                    
                                    <button className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                        <Mail className="w-5 h-5 text-green-600" />
                                        <span className="text-sm font-semibold text-green-700">Messages</span>
                                    </button>
                                    
                                    <button className="flex items-center gap-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                                        <Calendar className="w-5 h-5 text-orange-600" />
                                        <span className="text-sm font-semibold text-orange-700">Calendar</span>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


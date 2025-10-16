import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import Link from 'next/link';

export default function FeaturesPage() {
    const features = [
        {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Optimized performance with Next.js 14 and modern build tools for instant page loads.',
            color: 'from-yellow-400 to-orange-500',
        },
        {
            icon: '🔒',
            title: 'Secure by Default',
            description: 'Enterprise-grade security with built-in protection against common vulnerabilities.',
            color: 'from-green-400 to-cyan-500',
        },
        {
            icon: '🚀',
            title: 'Scalable Architecture',
            description: 'Built to scale from startup to enterprise with cloud-native infrastructure.',
            color: 'from-purple-400 to-pink-500',
        },
        {
            icon: '📱',
            title: 'Responsive Design',
            description: 'Perfect experience across all devices - mobile, tablet, and desktop.',
            color: 'from-blue-400 to-indigo-500',
        },
        {
            icon: '🎨',
            title: 'Modern UI/UX',
            description: 'Beautiful, intuitive interfaces built with the latest design trends.',
            color: 'from-pink-400 to-rose-500',
        },
        {
            icon: '🔧',
            title: 'Easy Integration',
            description: 'RESTful APIs and webhooks for seamless integration with your tools.',
            color: 'from-teal-400 to-green-500',
        },
        {
            icon: '📊',
            title: 'Analytics Dashboard',
            description: 'Real-time insights and metrics to track your business performance.',
            color: 'from-indigo-400 to-purple-500',
        },
        {
            icon: '🌐',
            title: 'Global CDN',
            description: 'Lightning-fast content delivery worldwide with 99.99% uptime.',
            color: 'from-cyan-400 to-blue-500',
        },
        {
            icon: '💬',
            title: '24/7 Support',
            description: 'Round-the-clock assistance from our dedicated support team.',
            color: 'from-orange-400 to-red-500',
        },
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-6xl font-bold mb-6">Powerful Features</h1>
                    <p className="text-2xl text-purple-100 max-w-3xl mx-auto">
                        Everything you need to build, scale, and succeed. Built with modern technologies for modern businesses.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} hover>
                                <div className="p-8">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 text-purple-100">
                        Join thousands of developers building amazing applications.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/pricing"
                            className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all border-2 border-white/30"
                        >
                            View Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'Features - Sampath Portfolio',
    description: 'Discover powerful features built for modern web applications',
};
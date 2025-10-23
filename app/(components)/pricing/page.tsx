import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { Button } from '@/app/reusableComponents/ui/Button';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: 'Starter',
            price: '$29',
            period: '/month',
            description: 'Perfect for individuals and small projects',
            features: [
                'Up to 5 projects',
                'Basic analytics',
                'Email support',
                '1GB storage',
                'Standard templates'
            ],
            popular: false,
            buttonText: 'Get Started',
            buttonVariant: 'outline' as const
        },
        {
            name: 'Professional',
            price: '$79',
            period: '/month',
            description: 'Ideal for growing businesses and teams',
            features: [
                'Unlimited projects',
                'Advanced analytics',
                'Priority support',
                '10GB storage',
                'Premium templates',
                'Team collaboration',
                'Custom integrations'
            ],
            popular: true,
            buttonText: 'Start Free Trial',
            buttonVariant: 'primary' as const
        },
        {
            name: 'Enterprise',
            price: '$199',
            period: '/month',
            description: 'For large organizations with advanced needs',
            features: [
                'Everything in Professional',
                'Dedicated account manager',
                '24/7 phone support',
                'Unlimited storage',
                'Custom development',
                'Advanced security',
                'SLA guarantee'
            ],
            popular: false,
            buttonText: 'Contact Sales',
            buttonVariant: 'outline' as const
        }
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
                        Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
                    </p>
                </div>
            </section>

            <section className="py-16 sm:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                            <Star className="w-4 h-4" />
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                
                                <div className="p-6 sm:p-8">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <p className="text-gray-600 text-sm sm:text-base mb-4">{plan.description}</p>
                                        <div className="flex items-baseline justify-center">
                                            <span className="text-4xl sm:text-5xl font-bold text-gray-900">{plan.price}</span>
                                            <span className="text-gray-600 ml-1">{plan.period}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-3">
                                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        variant={plan.buttonVariant}
                                        className="w-full"
                                        href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Yes, we offer a 14-day free trial for all plans. No credit card required.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                                </p>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    Yes, we offer a 30-day money-back guarantee for all plans.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
                    <p className="text-lg sm:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                        Join thousands of developers and businesses who trust our platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="bg-white text-purple-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all transform hover:scale-105"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all border-2 border-white/30"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'Pricing - Sampath Portfolio',
    description: 'Simple, transparent pricing for all your needs',
};
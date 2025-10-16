import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { Badge } from '@/app/reusableComponents/ui/Badge';

export default function PricingPage() {
    const plans = [
        {
            name: 'Starter',
            price: '0',
            description: 'Perfect for trying out our platform',
            features: [
                '1 Project',
                '5 GB Storage',
                'Basic Support',
                'Community Access',
                'Basic Analytics',
            ],
            notIncluded: [
                'Advanced Features',
                'Priority Support',
                'Custom Domain',
            ],
            color: 'gray',
            buttonText: 'Get Started Free',
            popular: false,
        },
        {
            name: 'Professional',
            price: '29',
            description: 'For professionals and small teams',
            features: [
                'Unlimited Projects',
                '100 GB Storage',
                'Priority Support',
                'Advanced Analytics',
                'Custom Domain',
                'Team Collaboration',
                'API Access',
                'White-label Option',
            ],
            notIncluded: [
                'Dedicated Account Manager',
                'Custom Integrations',
            ],
            color: 'purple',
            buttonText: 'Start 14-day Trial',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: '99',
            description: 'For large organizations',
            features: [
                'Everything in Professional',
                'Unlimited Storage',
                '24/7 Premium Support',
                'Dedicated Account Manager',
                'Custom Integrations',
                'SLA Guarantee',
                'Advanced Security',
                'On-premise Deployment',
                'Training & Onboarding',
            ],
            notIncluded: [],
            color: 'blue',
            buttonText: 'Contact Sales',
            popular: false,
        },
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-2xl text-purple-200 max-w-3xl mx-auto">
                        Choose the perfect plan for your needs. All plans include a 14-day free trial.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card
                                key={index}
                                hover
                                className={`relative ${plan.popular ? 'transform scale-105 shadow-2xl' : ''}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge variant="warning">Most Popular</Badge>
                                    </div>
                                )}

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>

                                    <div className="mb-6">
                                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                                        <span className="text-gray-600">/month</span>
                                    </div>

                                    <button
                                        className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${plan.popular
                                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                                            }`}
                                    >
                                        {plan.buttonText}
                                    </button>

                                    <div className="space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}

                                        {plan.notIncluded.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 opacity-50">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <span className="text-gray-500">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I change my plan later?',
                                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
                            },
                            {
                                q: 'Is there a setup fee?',
                                a: 'No setup fees. What you see is what you pay. No hidden charges.',
                            },
                            {
                                q: 'Can I cancel anytime?',
                                a: 'Absolutely! Cancel anytime with no penalties. Your data will be available for 30 days after cancellation.',
                            },
                        ].map((faq, index) => (
                            <Card key={index}>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">{faq.q}</h3>
                                    <p className="text-gray-600">{faq.a}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'Pricing - Sampath Portfolio',
    description: 'Simple, transparent pricing plans for everyone',
};
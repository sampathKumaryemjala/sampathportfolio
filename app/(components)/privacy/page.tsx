import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const sections = [
        {
            icon: Database,
            title: 'Information We Collect',
            content: [
                'Personal information you provide (name, email, phone number)',
                'Usage data and analytics',
                'Cookies and tracking technologies',
                'Device and browser information'
            ]
        },
        {
            icon: Lock,
            title: 'How We Use Your Information',
            content: [
                'To provide and maintain our services',
                'To notify you about changes to our services',
                'To provide customer support',
                'To gather analysis and improve our services',
                'To detect and prevent fraud'
            ]
        },
        {
            icon: Shield,
            title: 'Data Security',
            content: [
                'We use industry-standard encryption',
                'Regular security audits and updates',
                'Limited access to personal data',
                'Secure data storage and transmission',
                'Regular backup and disaster recovery procedures'
            ]
        },
        {
            icon: Eye,
            title: 'Data Sharing',
            content: [
                'We do not sell your personal information',
                'We may share data with trusted service providers',
                'Legal compliance when required by law',
                'Business transfers (mergers, acquisitions)',
                'With your explicit consent'
            ]
        },
        {
            icon: UserCheck,
            title: 'Your Rights',
            content: [
                'Access your personal data',
                'Correct inaccurate data',
                'Request deletion of your data',
                'Object to processing of your data',
                'Data portability',
                'Withdraw consent at any time'
            ]
        },
        {
            icon: FileText,
            title: 'Cookies & Tracking',
            content: [
                'Essential cookies for site functionality',
                'Analytics cookies to improve user experience',
                'Marketing cookies (with your consent)',
                'You can manage cookie preferences in your browser',
                'Third-party cookies from embedded content'
            ]
        }
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                            Privacy Policy
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 mb-4">
                            Your privacy is important to us
                        </p>
                        <p className="text-sm sm:text-base text-purple-200">
                            Last updated: January 2025
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto">
                        <Card className="mb-8 bg-blue-50 border-blue-200">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                            Introduction
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            At Sampath Portfolio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="grid gap-6 sm:gap-8 mb-8">
                            {sections.map((section, index) => {
                                const Icon = section.icon;
                                return (
                                    <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                                        <div className="p-6 sm:p-8">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-3 flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                                                    {section.title}
                                                </h2>
                                            </div>
                                            <ul className="space-y-3 ml-0 sm:ml-16">
                                                {section.content.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                                                        <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>

                        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                            Contact Us
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                                            If you have any questions or concerns about this Privacy Policy, please contact us at:
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-purple-700 font-semibold">Email: sampathyemjala@gmail.com</p>
                                            <p className="text-gray-600 text-sm sm:text-base">Phone: +91 7729827183</p>
                                            <p className="text-gray-600 text-sm sm:text-base">Location: Hyderabad, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg">
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                <strong>Note:</strong> We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the &quot;Last updated&quot; date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'Privacy Policy - Sampath Portfolio',
    description: 'Privacy Policy for Sampath Portfolio - Learn how we collect, use, and protect your data',
};


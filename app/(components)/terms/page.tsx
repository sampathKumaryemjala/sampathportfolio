import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, UserX, RefreshCw, Globe } from 'lucide-react';

export default function TermsOfServicePage() {
    const sections = [
        {
            icon: CheckCircle,
            title: 'Acceptance of Terms',
            content: [
                'By accessing this website, you accept these terms and conditions in full',
                'If you disagree with any part of these terms, do not use our website',
                'We may revise these terms at any time by updating this page',
                'You should check this page regularly to ensure you are happy with any changes'
            ]
        },
        {
            icon: Globe,
            title: 'Use License',
            content: [
                'Permission is granted to temporarily view the materials on this website',
                'This is a license, not a transfer of title',
                'You may not modify or copy the materials',
                'You may not use the materials for commercial purposes',
                'You may not attempt to reverse engineer any software on this website',
                'This license shall automatically terminate if you violate any of these restrictions'
            ]
        },
        {
            icon: XCircle,
            title: 'Disclaimer',
            content: [
                'The materials on this website are provided on an "as is" basis',
                'We make no warranties, expressed or implied',
                'We do not warrant the accuracy or completeness of materials',
                'We do not warrant that the website will be uninterrupted or error-free',
                'We do not warrant that defects will be corrected'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Limitations',
            content: [
                'We shall not be liable for any damages arising out of use or inability to use materials',
                'This includes damages from errors, omissions, or interruptions',
                'Some jurisdictions do not allow limitations on warranties',
                'These limitations may not apply to you'
            ]
        },
        {
            icon: RefreshCw,
            title: 'Revisions and Errata',
            content: [
                'Materials on this website may include technical or typographical errors',
                'We do not warrant that materials are accurate or complete',
                'We may make changes to materials at any time without notice',
                'We do not commit to updating the materials'
            ]
        },
        {
            icon: UserX,
            title: 'Prohibited Uses',
            content: [
                'You may not use the website in any unlawful manner',
                'You may not violate any applicable laws or regulations',
                'You may not infringe upon intellectual property rights',
                'You may not transmit any harmful code or malware',
                'You may not engage in any data mining or similar activities',
                'You may not interfere with security-related features'
            ]
        },
        {
            icon: FileText,
            title: 'Intellectual Property',
            content: [
                'All content on this website is owned or licensed by us',
                'This includes text, graphics, logos, images, and software',
                'All content is protected by copyright and trademark laws',
                'Unauthorized use of content is strictly prohibited',
                'You may not reproduce or distribute content without permission'
            ]
        },
        {
            icon: Scale,
            title: 'Governing Law',
            content: [
                'These terms are governed by the laws of India',
                'Any disputes will be subject to the exclusive jurisdiction of Indian courts',
                'You submit to the personal jurisdiction of such courts',
                'The United Nations Convention on Contracts for the International Sale of Goods does not apply'
            ]
        }
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16 sm:py-20 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                <Scale className="w-12 h-12 sm:w-16 sm:h-16" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-purple-100 mb-4">
                            Please read these terms carefully before using our website
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
                        <Card className="mb-8 bg-purple-50 border-purple-200">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                            Important Notice
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                            These Terms of Service constitute a legally binding agreement between you and Sampath Portfolio. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please discontinue use of our website immediately.
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
                                                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-3 flex-shrink-0">
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                                                    {section.title}
                                                </h2>
                                            </div>
                                            <ul className="space-y-3 ml-0 sm:ml-16">
                                                {section.content.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0" />
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

                        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <FileText className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                                            Questions About Terms?
                                        </h3>
                                        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                                            If you have any questions about these Terms of Service, please contact us:
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-indigo-700 font-semibold">Email: sampathyemjala@gmail.com</p>
                                            <p className="text-gray-600 text-sm sm:text-base">Phone: +91 7729827183</p>
                                            <p className="text-gray-600 text-sm sm:text-base">Location: Hyderabad, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="mt-8 p-4 sm:p-6 bg-gray-100 rounded-lg">
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                <strong>Changes to Terms:</strong> We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of changes constitutes your acceptance of such changes. We recommend that you review these terms periodically for any updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export const metadata = {
    title: 'Terms of Service - Sampath Portfolio',
    description: 'Terms of Service for Sampath Portfolio - Read our terms and conditions',
};


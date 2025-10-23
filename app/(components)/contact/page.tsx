'use client';

import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate form submission (no server database)
            console.log('Contact form submission:', formData);
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSubmitting(false);
            setSubmitted(true);

            // Reset form
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: '📧',
            title: 'Email',
            value: 'sampathyemjala@gmail.com',
            link: 'mailto:sampathyemjala@gmail.com',
        },
        {
            icon: '📱',
            title: 'Phone',
            value: '+91 7729827183',
            link: 'tel:+917729827183',
        },
        {
            icon: '📍',
            title: 'Location',
            value: 'Hyderabad, Telangana, India',
            link: '#',
        },
    ];

    return (
        <Layout>
            <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">Get In Touch</h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-purple-200 max-w-3xl mx-auto">
                        Have a question or want to work together? I would love to hear from you!
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12">
                       
                        <Card>
                            <div className="p-4 sm:p-6 lg:p-8">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 dark:text-white">Send a Message</h2>

                                {submitted && (
                                    <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6">
                                        <p className="font-semibold">✓ Message sent successfully!</p>
                                        <p className="text-sm">I ll get back to you soon.</p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 dark:focus:border-purple-400 transition-colors resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            placeholder="Tell me more about your project..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${isSubmitting
                                                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                                                : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transform hover:scale-105'
                                            } text-white`}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </Card>

                       
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 dark:text-white">Contact Information</h2>
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => (
                                        <Card key={index} hover>
                                            <a href={info.link} className="p-6 flex items-center gap-4 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                                                <div className="text-4xl">{info.icon}</div>
                                                <div>
                                                    <div className="font-semibold text-gray-500 dark:text-gray-400 text-sm">{info.title}</div>
                                                    <div className="text-lg font-bold text-gray-900 dark:text-white">{info.value}</div>
                                                </div>
                                            </a>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                           
                        </div>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 dark:text-white">📅 Availability</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    I m currently available for freelance projects and full-time opportunities.
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-green-700 dark:text-green-400 font-semibold">Available Now</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 dark:text-white">Find Me Here</h2>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-xl lg:rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">📍 Hyderabad, Telangana, India</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
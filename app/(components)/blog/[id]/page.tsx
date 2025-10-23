import { Layout } from '@/app/reusableComponents/layout/Layout';
import { Card } from '@/app/reusableComponents/ui/Card';
import { Badge } from '@/app/reusableComponents/ui/Badge';
import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import postsData from '@/data/posts.json';

interface BlogDetailPageProps {
    params: {
        id: string;
    };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const postId = parseInt(params.id);

    // Get post from static JSON file
    const post = postsData.find(p => p.id === postId) as Post | undefined;

    if (!post) {
        return (
            <Layout>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12 sm:py-16 lg:py-20">
                    <div className="container mx-auto px-4 sm:px-6 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
                        <p className="text-lg text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 sm:py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 sm:mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm sm:text-base">Back to Blog</span>
                        </Link>

                        {/* Article Header */}
                        <Card className="mb-8 sm:mb-12">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    <Badge>{post.category}</Badge>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                    {post.title}
                                </h1>

                                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="text-xs sm:text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Article Image */}
                        <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl mb-8 sm:mb-12">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <Card>
                            <div className="p-6 sm:p-8 lg:p-12">
                                <div className="prose prose-lg max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {post.content}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Author Info */}
                        <Card className="mt-8 sm:mt-12">
                            <div className="p-6 sm:p-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{post.author}</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Full-Stack Developer</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const metadata = {
    title: 'Blog Post - Sampath Portfolio',
    description: 'Read our latest blog posts about web development',
};

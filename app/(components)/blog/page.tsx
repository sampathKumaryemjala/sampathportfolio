
import { Post } from '@/types';
import postsData from '@/data/posts.json';
import { Layout } from '@/app/reusableComponents/layout/Layout';
import { PostCard } from '@/app/reusableComponents/blog/PostCard';

export default function BlogPage() {
    const posts: Post[] = postsData;

    return (
        <Layout>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-12 sm:py-16 lg:py-20 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">Blog</h1>
                    <p className="text-lg sm:text-xl text-gray-600 text-center mb-8 sm:mb-12">
                        Thoughts, tutorials, and insights on web development
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// Optional: Add metadata
export const metadata = {
    title: 'Blog - Sampath Portfolio',
    description: 'Thoughts, tutorials, and insights on web development',
};
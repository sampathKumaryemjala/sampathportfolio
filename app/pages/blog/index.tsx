import { GetStaticProps } from 'next';
import { Layout } from '../../reusableComponents/layout/Layout';
import { PostCard } from '../../reusableComponents/blog/PostCard';
import { Post } from '@/types';
import postsData from "../../../data/posts.json"

interface BlogPageProps {
    posts: Post[];
}

export default function BlogPage({ posts }: BlogPageProps) {
    return (
        <Layout>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 min-h-screen">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold text-center mb-4">Blog</h1>
                    <p className="text-xl text-gray-600 text-center mb-12">
                        Thoughts, tutorials, and insights on web development
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts: Post[] = postsData;

    return {
        props: {
            posts,
        },
        revalidate: 60,
    };
};
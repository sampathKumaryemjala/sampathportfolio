
import { Post } from '@/types';
import postsData from '@/data/posts.json';
import { notFound } from 'next/navigation';
import { Layout } from '@/app/reusableComponents/layout/Layout';
import { PostDetail } from '@/app/reusableComponents/blog/PostDetail';

interface PostPageProps {
    params: {
        id: string;
    };
}

export default function PostPage({ params }: PostPageProps) {
    const posts: Post[] = postsData;
    const post = posts.find((p) => p.id.toString() === params.id);

    if (!post) {
        notFound();
    }

    return (
        <Layout>
            <PostDetail post={post} />
        </Layout>
    );
}

// Generate static params for all posts
export async function generateStaticParams() {
    const posts: Post[] = postsData;

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

// Optional: Add dynamic metadata
export async function generateMetadata({ params }: PostPageProps) {
    const posts: Post[] = postsData;
    const post = posts.find((p) => p.id.toString() === params.id);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} - Sampath Portfolio`,
        description: post.excerpt,
    };
}
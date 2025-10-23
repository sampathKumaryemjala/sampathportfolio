import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../reusableComponents/layout/Layout';
import { PostDetail } from '../../reusableComponents/blog/PostDetail';
import { Post } from '@/types';
import postsData from "../../../data/posts.json"

interface PostPageProps {
    post: Post;
}

export default function PostPage({ post }: PostPageProps) {
    return (
        <Layout>
            <PostDetail post={post} />
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: Post[] = postsData;

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const posts: Post[] = postsData;
    const post = posts.find((p) => p.id.toString() === params?.id);

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
    };
};
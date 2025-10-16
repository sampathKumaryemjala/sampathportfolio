import Image from 'next/image';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Post } from '@/types';

interface PostDetailProps {
    post: Post;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
    return (
        <article className="py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <Badge>{post.category}</Badge>
                </div>

                <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

                <div className="flex items-center gap-4 text-gray-600 mb-8">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
                        {post.content}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                        <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            #{tag}
                        </span>
                    ))}
                </div>

                <Button href="/blog" variant="outline">
                    ← Back to Blog
                </Button>
            </div>
        </article>
    );
};
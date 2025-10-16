import Image from 'next/image';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Post } from '@/types';

interface PostCardProps {
    post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <Card hover className="h-full">
            <Link href={`/blog/${post.id}`}>
                <div className="relative h-48 w-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Badge>{post.category}</Badge>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-purple-600 transition-colors">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </Card>
    );
};
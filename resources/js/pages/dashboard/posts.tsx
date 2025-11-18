import PostCard from '@/components/PostCard';
import { PostInterface } from '@/types';

interface PostsProps {
    posts: PostInterface[];
}
function posts({ posts }: PostsProps) {
    return (
        <div className="grid grid-cols-1 px-4">
            {posts.map((post) => {
                return <PostCard post={post} />;
            })}
        </div>
    );
}

export default posts;

import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';

interface Post {
    id: string;
    body: string;
    created_at: string;
    like: number;
    liked: boolean;
    user: {
        name: string;
    };
}

interface PostPageProps {
    post: Post; // the "post" key from Inertia response
}

function Show({ post }: PostPageProps) {
    console.log('post: ', post);
    return (
        <>
            <div className="mx-8 flex w-full flex-col items-center md:mx-0">
                <PostCard post={post} />
            </div>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Show;

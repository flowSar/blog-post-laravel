import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import Layout from '@/layouts/Layout';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface PostProps {
    id: string;
    body: string;
    created_at: string;
    like: number;
    liked: boolean;
    user: {
        name: string;
    };
}

interface IndexProps {
    posts: PostProps[];
}

function Index({ posts }: IndexProps) {
    const { flash }: any = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash.error || flash.success) {
            setVisible(true);
        }

        const timer = setTimeout(() => setVisible(false), 2000);

        return () => clearTimeout(timer);
    }, [flash]);

    return (
        <>
            <Layout>
                <div className="mx-8 flex w-full flex-col items-center md:mx-0">
                    {visible && flash.error ? (
                        <p className="text-bold absolute top-6 w-72 rounded-2xl bg-red-500/85 px-8 py-3.5 text-center shadow-md shadow-white/5">
                            {flash.error}
                        </p>
                    ) : (
                        ''
                    )}
                    {visible && flash.success ? (
                        <p className="text-bold absolute top-6 w-72 rounded-2xl bg-green-500/85 px-8 py-3.5 text-center shadow-md shadow-white/5">
                            {flash.success}
                        </p>
                    ) : (
                        ''
                    )}
                    <PostForm />
                    <section id="posts" className="mx-2 mt-10 flex flex-col items-center gap-4 md:mx-10 md:w-3/5">
                        {posts.map((post) => (
                            <PostCard post={post} />
                        ))}
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default Index;

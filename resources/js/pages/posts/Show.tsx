import CommentCard from '@/components/CommentCard';
import Divider from '@/components/Divider';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';
import { CommentProps, PostProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PostPageProps {
    post: PostProps; // the "post" key from Inertia response
    comments: CommentProps[];
}

function Show({ post, comments }: PostPageProps) {
    const { flash }: any = usePage().props;
    const form = useForm({
        body: '',
    });

    const handleCommentSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(`/posts/${post.id}/comments`);
    };

    useEffect(() => {
        if (flash.success) {
            form.setData('body', '');
        }
    }, [flash]);

    return (
        <>
            <section id="posts" className="mx-2 flex w-4/5 flex-col items-center md:mx-10 md:w-3/5">
                <PostCard post={post} />
                <Divider label="Comment" />
                <form onSubmit={handleCommentSubmit} className="flex w-full flex-col gap-4">
                    <textarea
                        name="body"
                        value={form.data.body}
                        onChange={(e) => form.setData(e.target.name as 'body', e.target.value)}
                        className="h-32 w-full rounded-2xl bg-white/10 px-4 py-4 focus:outline-none md:h-24"
                        placeholder="Post your repy"
                    ></textarea>
                    <button
                        disabled={form.data.body.trim() || form.processing ? false : true}
                        type="submit"
                        className="cursor-pointer self-end rounded-2xl bg-white/10 px-6 py-2 disabled:cursor-not-allowed"
                    >
                        Reply
                    </button>
                </form>
                <Divider label="Comments" />
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </section>
        </>
    );
}

Show.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Show;

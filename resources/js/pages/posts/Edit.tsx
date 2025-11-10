import { update } from '@/actions/App/Http/Controllers/PostController';
import Layout from '@/layouts/Layout';
import { PostProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface PostPageProps {
    post: PostProps; // the "post" key from Inertia response
}

function Edit({ post }: PostPageProps) {
    console.log('post', post.body);
    const { flash }: any = usePage().props;
    const form = useForm({
        body: post.body,
    });

    const handlePostSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // form.post(`/posts/${post.id}/comments`);
        form.submit(update(Number(post.id)));
    };

    useEffect(() => {
        if (flash.success) {
            form.setData('body', '');
        }
    }, [flash]);

    return (
        <>
            <section id="posts" className="mx-2 flex w-4/5 flex-col items-center md:mx-10 md:w-3/5">
                <form onSubmit={handlePostSubmit} method="POST" className="flex w-full flex-col gap-4">
                    <textarea
                        name="body"
                        value={form.data.body}
                        onChange={(e) => form.setData(e.target.name as 'body', e.target.value)}
                        className="w-full rounded-2xl bg-white/10 px-4 py-4 focus:outline-none"
                        placeholder="Post your repy"
                        rows={5}
                    >
                        {post.body}
                    </textarea>
                    {form.errors.body ? <p className="text-sm text-red-400">{form.errors.body}</p> : ''}
                    <button
                        disabled={form.data.body.trim() || form.processing ? false : true}
                        type="submit"
                        className="cursor-pointer self-end rounded-2xl bg-white/10 px-6 py-2 disabled:cursor-not-allowed"
                    >
                        Update
                    </button>
                </form>
                {/* <Divider label="Comments" /> */}
                {/* {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))} */}
            </section>
        </>
    );
}

Edit.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Edit;

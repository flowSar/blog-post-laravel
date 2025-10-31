import { destroy, store } from '@/actions/App/Http/Controllers/LikeController';
import { show } from '@/actions/App/Http/Controllers/PostController';
import { Link, useForm } from '@inertiajs/react';

interface PostProps {
    post: {
        id: string;
        body: string;
        like: number;
        created_at: string;
        liked: boolean;
        user: {
            name: string;
        };
    };
}

function PostCard({ post }: PostProps) {
    const likeForm = useForm();
    // const unKikeForm = useForm();

    return (
        <div className="w-full md:w-9/10">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all duration-200 hover:border-gray-700 hover:shadow-xl">
                <div className="flex w-full flex-1 gap-4">
                    <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800 ring-offset-2 ring-offset-gray-900"></div>
                    <div className="flex min-w-0 flex-col justify-center">
                        <h2 className="truncate text-base font-semibold text-gray-100">{post.user.name}</h2>
                        <h4 className="text-sm text-gray-500">{post.created_at}</h4>
                    </div>
                </div>

                <p className="mt-4 leading-relaxed whitespace-pre-wrap text-gray-300">{post.body}</p>

                <div className="mt-5 flex items-center gap-6 border-t border-gray-800 pt-4">
                    {post.liked ? (
                        <Link
                            href={destroy(post.id)}
                            method="delete"
                            preserveScroll={true}
                            className="group flex cursor-pointer items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                        >
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Unlike
                        </Link>
                    ) : (
                        <Link
                            href={store(post.id)}
                            method="post"
                            preserveScroll={true}
                            className="group flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-red-400"
                        >
                            <svg
                                className="h-5 w-5 cursor-pointer fill-none stroke-current transition-all group-hover:fill-current"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Like
                        </Link>
                    )}

                    <span className="text-sm font-medium text-gray-500">
                        {post.like} {post.like === 1 ? 'like' : 'likes'}
                    </span>

                    <Link
                        href={show(post.id)}
                        className="ml-auto flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        Comments (0)
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostCard;

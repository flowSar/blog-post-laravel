import { destroy, store } from '@/actions/App/Http/Controllers/LikeController';
import { destroy as destroyPost, edit, show } from '@/actions/App/Http/Controllers/PostController';
import { PostProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import LikeIcon from './icons/LikeIcon';
import ThreeDots from './icons/ThreeDots';

interface PostCardtProps {
    post: PostProps;
}

function PostCard({ post }: PostCardtProps) {
    const [menuVisibility, setMenuVisibility] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenuVisiblity = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (post.can_delete) {
            setMenuVisibility((v) => !v);
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisibility(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full md:w-9/10">
            <div
                // onClick={() => router.visit(`/posts/${post.id}`)}
                onClick={() => router.get(show(post.id).url)}
                className="cursor-pointer rounded-xl border border-transparent border-b-gray-800 p-6 shadow-lg transition-all duration-200 hover:border hover:border-gray-700 hover:shadow-xl"
            >
                <div className="flex justify-between">
                    <div className="flex w-full flex-1 gap-4">
                        <div className="h-14 w-14 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800 ring-offset-2 ring-offset-gray-900"></div>
                        <div className="flex min-w-0 flex-col justify-center">
                            <h2 className="truncate text-base font-semibold text-gray-100">{post.user.name}</h2>
                            <h4 className="text-sm text-gray-500">{post.created_at}</h4>
                        </div>
                    </div>
                    {post.can_delete ? (
                        <button
                            onClick={toggleMenuVisiblity}
                            className="cursor-pointer self-start rounded-full px-2 py-2 duration-200 hover:bg-white/5"
                        >
                            <ThreeDots />
                        </button>
                    ) : (
                        ''
                    )}
                </div>

                <p className="mt-4 leading-relaxed whitespace-pre-wrap text-gray-300">{post.body}</p>

                <div className="mt-5 flex items-center gap-6 pt-4">
                    {post.liked ? (
                        <Link
                            key={post.id}
                            href={destroy(post.id)}
                            method="delete"
                            preserveScroll={true}
                            className="group flex cursor-pointer items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                        >
                            <LikeIcon fill={true} />
                            Unlike
                        </Link>
                    ) : (
                        <Link
                            href={store(post.id)}
                            method="post"
                            preserveScroll={true}
                            className="group flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-red-400"
                        >
                            <LikeIcon />
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
                        Comments ({post.comments})
                    </Link>
                </div>
            </div>

            <div
                ref={menuRef}
                className={`absolute top-2 right-2 flex flex-col rounded-xl bg-black px-8 py-4 shadow-sm shadow-white ${menuVisibility ? 'block' : 'hidden'}`}
            >
                <Link href={edit(post.id)} className="cursor-pointer py-2">
                    Edit
                </Link>
                <Link href={destroyPost(post.id)} method="delete" className="cursor-pointer py-2 text-red-500">
                    Delete
                </Link>
            </div>
        </div>
    );
}

export default PostCard;

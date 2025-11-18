import { CommentProps, ProfileInterface } from '@/types';
import { Link } from '@inertiajs/react';
import LikeIcon from './icons/LikeIcon';

interface CommentCardProps {
    comment: CommentProps;
    profile?: ProfileInterface;
}

function CommentCard({ comment, profile }: CommentCardProps) {
    return (
        <>
            <div className="w-full md:w-9/10">
                <div className="rounded-xl border border-transparent border-b-gray-800 p-6 shadow-lg transition-all duration-200 hover:border hover:border-gray-700 hover:shadow-xl dark:bg-black">
                    <div className="flex w-full flex-1 gap-4">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800 ring-offset-2 ring-offset-gray-900">
                            {profile?.profile_img_url ? (
                                <img src={`/storage/${profile?.profile_img_url}`} className="h-full w-full object-cover" />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="flex min-w-0 flex-col justify-center">
                            <h2 className="truncate text-base font-semibold text-black dark:text-gray-100">{comment.user.name}</h2>
                            <h4 className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleTimeString()}</h4>
                        </div>
                    </div>

                    <p className="mt-4 leading-relaxed whitespace-pre-wrap text-black dark:text-gray-300">{comment.body}</p>
                    <div className="mt-2 flex items-center gap-6 pt-4">
                        {comment.liked ? (
                            <Link
                                href={'#'}
                                method="delete"
                                preserveScroll={true}
                                className="group flex cursor-pointer items-center gap-1.5 text-sm font-medium text-red-400 transition-colors hover:text-red-300"
                            >
                                <LikeIcon fill={true} />
                                Unlike
                            </Link>
                        ) : (
                            <Link
                                href={'#'}
                                preserveScroll={true}
                                className="group flex items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-red-400"
                            >
                                <LikeIcon />
                                Like
                            </Link>
                        )}

                        <span className="text-sm font-medium text-gray-500">
                            (0) like
                            {/* {0} {post.like === 1 ? 'like' : 'likes'} */}
                        </span>

                        <Link
                            href="#"
                            className="ml-auto flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-400 transition-colors hover:text-gray-300"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            Comments ({0})
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentCard;

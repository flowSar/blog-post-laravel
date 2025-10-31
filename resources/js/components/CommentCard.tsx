import { CommentProps } from '@/types';

interface CommentCardProps {
    comment: CommentProps;
}

function CommentCard({ comment }: CommentCardProps) {
    return (
        <>
            <div className="w-full md:w-9/10">
                <div className="rounded-xl border-b border-gray-800 p-6 shadow-lg transition-all duration-200 hover:border hover:border-gray-700 hover:shadow-xl">
                    <div className="flex w-full flex-1 gap-4">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800 ring-offset-2 ring-offset-gray-900"></div>
                        <div className="flex min-w-0 flex-col justify-center">
                            <h2 className="truncate text-base font-semibold text-gray-100">{comment.user.name}</h2>
                            <h4 className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleTimeString()}</h4>
                        </div>
                    </div>

                    <p className="mt-4 leading-relaxed whitespace-pre-wrap text-gray-300">{comment.body}</p>
                </div>
            </div>
        </>
    );
}

export default CommentCard;

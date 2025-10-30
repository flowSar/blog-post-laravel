import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, useEffect } from 'react';
import InputError from './InputError';

function PostForm() {
    const { flash }: any = usePage().props;
    const form = useForm({
        body: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        form.setData(e.target.name as 'body', e.target.value);
    };

    const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('/posts');
    };

    useEffect(() => {
        if (flash.success) {
            form.setData('body', '');
        }
    }, [flash]);

    return (
        <form className="mx-8 flex w-full flex-col items-center md:mx-0 md:w-3/5" onSubmit={handleFormSubmit}>
            <div className="w-9/10 rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition-all duration-200 hover:border-gray-700">
                <div className="mb-4 flex items-center gap-3">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-100">Create a Post</h3>
                </div>

                <textarea
                    value={form.data.body}
                    onChange={handleFormChange}
                    name="body"
                    className={`w-full resize-none rounded-lg border bg-gray-800 px-4 py-3 text-gray-200 placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:outline-none ${
                        form.errors.body
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                            : 'border-gray-700 focus:border-blue-500 focus:ring-blue-500/50'
                    }`}
                    placeholder="What's on your mind?"
                    rows={6}
                ></textarea>

                <InputError error={form.errors.body} />

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Share your thoughts with the community</span>
                    </div>

                    <button
                        type="submit"
                        disabled={form.processing || !form.data.body.trim()}
                        className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-purple-600"
                    >
                        {form.processing ? (
                            <>
                                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Posting...
                            </>
                        ) : (
                            <>
                                Post
                                <svg
                                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PostForm;

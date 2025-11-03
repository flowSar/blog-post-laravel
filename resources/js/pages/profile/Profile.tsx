import Divider from '@/components/Divider';
import PostCard from '@/components/PostCard';
import Layout from '@/layouts/Layout';
import { PostProps, UserProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
    posts: PostProps[];
    user: UserProps;
    owner: boolean;
}

function Profile({ posts, user, owner }: Props) {
    const { auth } = usePage().props;
    console.log('posts: ', auth);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const saveBtnref = useRef<HTMLButtonElement>(null);
    const dialogref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (editBtnRef.current) {
            editBtnRef.current.addEventListener('click', () => {
                dialogref.current?.showModal();
            });
            saveBtnref.current?.addEventListener('click', () => {
                dialogref.current?.close();
            });
        }
    }, []);
    return (
        <div className="item-center mx-auto flex min-h-screen w-full flex-1 flex-col md:w-6xl">
            <div className="flex w-full gap-8">
                <aside className="w-1/4"></aside>
                <div className="w-2/4">
                    <div id="banner" className="relative h-64 w-full bg-white/5">
                        <div className="absolute -bottom-20 left-6 h-48 w-48 rounded-full bg-white/10"></div>
                    </div>
                    <div className="flex flex-col pt-6">
                        {owner ? (
                            <button ref={editBtnRef} className="cursor-pointer self-end rounded-full border px-6 py-2">
                                Edit profile
                            </button>
                        ) : (
                            <button className="cursor-pointer self-end rounded-full border bg-white px-6 py-2 font-bold text-black hover:bg-white/90">
                                Follow
                            </button>
                        )}
                        <div>
                            <h1 className="mt-8 text-2xl font-bold">{user.name}</h1>
                            <div className="flex gap-4">
                                <h3>0 Following</h3>
                                <h3>0 Followers</h3>
                            </div>
                        </div>

                        <div className="flex w-full flex-col items-center">
                            <Divider label="" />
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <dialog className="rounded-lg bg-black px-8 py-4 shadow-sm shadow-amber-100" ref={dialogref}>
                <div className="container">
                    <header className="flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="text-2xl font-bold">X</button>
                            <h1 className="text-2xl">Edit profile</h1>
                        </div>
                        <div>
                            <button ref={saveBtnref} className="rounded-full bg-white px-6 py-2 text-black">
                                Save
                            </button>
                        </div>
                    </header>
                    <main className="dialog-content flex flex-col">
                        <div id="banner" className="relative h-48 w-full bg-white/5">
                            <div className="absolute -bottom-10 left-6 h-32 w-32 rounded-full bg-white/10"></div>
                        </div>
                        <div className="mt-14 flex flex-col gap-2">
                            <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                                <label className="text-sm">Name</label>
                                <input type="text" className="mt-1 focus:ring-0 focus:outline-none" placeholder="Name" />
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                                <label className="text-sm">Email</label>
                                <input disabled type="text" className="mt-1 focus:ring-0 focus:outline-none" placeholder="emal" />
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                                <label className="text-sm">Bio</label>
                                <textarea rows={2} className="mt-1 focus:ring-0 focus:outline-none" placeholder="Bio"></textarea>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                                <label className="text-sm">Bio</label>
                                <textarea rows={2} className="mt-1 focus:ring-0 focus:outline-none" placeholder="Bio"></textarea>
                            </div>
                            <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                                <label className="text-sm">Bio</label>
                                <textarea rows={2} className="mt-1 focus:ring-0 focus:outline-none" placeholder="Bio"></textarea>
                            </div>
                        </div>
                    </main>
                </div>
            </dialog>
        </div>
    );
}
Profile.layout = (page: ReactNode) => <Layout children={page} />;
export default Profile;

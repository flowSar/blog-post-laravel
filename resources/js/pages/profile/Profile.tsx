import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import UserFollowController from '@/actions/App/Http/Controllers/UserFollowController';
import Divider from '@/components/Divider';
import PostCard from '@/components/PostCard';
import { PostProps, ProfileProps, UserProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import Modal from './components/Modal';

interface Props {
    posts: PostProps[];
    user: UserProps;
    profile: ProfileProps;
    owner: boolean;
}

function Profile({ posts, user, profile, owner }: Props) {
    const { auth }: any = usePage().props;

    console.log('profile: ', profile);
    const editBtnRef = useRef<HTMLButtonElement>(null);
    const dialogref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (editBtnRef.current) {
            editBtnRef.current.addEventListener('click', () => {
                dialogref.current?.showModal();
            });
        }
    }, []);

    const RenderFollowButton = () => {
        if (!auth.user) return <div className="mt-8"></div>;
        if (owner) {
            return (
                <button ref={editBtnRef} className="cursor-pointer self-end rounded-full border px-6 py-2">
                    Edit profile
                </button>
            );
        } else {
            if (user.followed_by_auth) {
                return (
                    <Link
                        href={UserFollowController.destroy(user.id)}
                        preserveScroll
                        method="post"
                        className="cursor-pointer self-end rounded-full border border-none bg-white px-6 py-2 font-bold text-black duration-300 hover:bg-red-400 hover:text-white"
                    >
                        Unfollow
                    </Link>
                );
            }
            return (
                <Link
                    href={UserFollowController.store(user.id)}
                    preserveScroll
                    method="post"
                    className="cursor-pointer self-end rounded-full border border-none bg-white px-6 py-2 font-bold text-black duration-300 hover:bg-blue-400 hover:text-white"
                >
                    Follow
                </Link>
            );
        }
    };

    return (
        <div className="item-center mx-auto mt-4 flex min-h-screen w-full flex-1 flex-col md:w-5xl">
            <div className="flex w-full gap-8">
                <aside className="flex w-2/10 flex-col items-start px-4 pt-30">
                    <Link href="/" className="underline-2 cursor-pointer px-4 py-2">
                        Home
                    </Link>
                    <Link href={ProfileController.show(auth.user.name)} className="underline-2 px-4 py-2">
                        Profile
                    </Link>
                </aside>
                <div className="w-3/4 border-x-1 border-gray-600 px-4">
                    <div id="banner" className="relative h-64 w-full bg-white/5">
                        {profile?.cover_img_url ? <img src={`/storage/${profile.cover_img_url}`} className="h-full w-full object-cover" /> : ''}
                        <div className="absolute -bottom-20 left-6 h-48 w-48 overflow-hidden rounded-full bg-white/10">
                            {profile?.profile_img_url ? (
                                <img src={`/storage/${profile.profile_img_url}`} className="h-full w-full object-cover" />
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col pt-6">
                        {RenderFollowButton()}
                        <div>
                            <h1 className="mt-8 text-2xl font-bold">{user.name}</h1>
                            <div className="mt-2 flex gap-4">
                                <Link
                                    href={UserFollowController.following(user.name)}
                                    method="get"
                                    as="button"
                                    className="cursor-pointer space-x-1 hover:underline"
                                >
                                    <span className='font-md text-xl"'>{user.following_count}</span>
                                    <span className="text-gray-400">Following</span>
                                </Link>
                                <Link
                                    href={UserFollowController.followers(user.name)}
                                    method="get"
                                    as="button"
                                    className="cursor-pointer space-x-1 hover:underline"
                                >
                                    <span className='font-md text-xl"'>{user.followers_count}</span>
                                    <span className="text-gray-400">Followers</span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex w-full flex-col items-center">
                            <Divider label="" />
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} profile={profile} />
                            ))}
                        </div>
                    </div>
                </div>
                <aside className="flex w-2/10 flex-col items-start px-4 pt-30"></aside>
            </div>
            <Modal dialogref={dialogref} profile={profile} user={user} />
        </div>
    );
}
// Profile.layout = (page: ReactNode) => <Layout children={page} />;
export default Profile;

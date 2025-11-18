import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import { UserInterface } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Followers from './Followers';
import Following from './Following';

interface SharedProps {
    activeTab: string;
    followingUsers: UserInterface[];
    followers: {
        id: number;
        user: UserInterface;
    }[];
}

function FollowersPage({ activeTab, followingUsers, followers }: SharedProps) {
    const [activatedTab, setActivatedTab] = useState(activeTab);
    const { auth }: any = usePage().props;

    console.log('users: ', usePage().props);

    const renderTab = () => {
        if (activatedTab === 'following') return <Following users={followingUsers} />;
        if (activatedTab === 'followers') return <Followers followers={followers} />;
    };

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-6xl">
            <aside className="flex w-2/10 flex-col items-start px-4 pt-30">
                <Link href="/" className="underline-2 cursor-pointer px-4 py-2">
                    Home
                </Link>
                <Link href={ProfileController.create(auth.user.name)} className="underline-2 px-4 py-2">
                    Profile
                </Link>
            </aside>
            <div className="flex-1 border-x-1 border-gray-600 px-4">
                <div>
                    <div className="flex h-18 items-center px-4">
                        <Link href={'/'} className="text-xl">
                            {'<-back'}
                        </Link>
                    </div>
                    <div className="flex h-12">
                        <button
                            onClick={() => setActivatedTab('following')}
                            className={`flex-1 cursor-pointer text-center ${activatedTab === 'following' && 'bg-white/10'}`}
                        >
                            Following
                        </button>
                        <button
                            onClick={() => setActivatedTab('followers')}
                            className={`flex-1 cursor-pointer text-center ${activatedTab === 'followers' && 'bg-white/10'}`}
                        >
                            Followers
                        </button>
                    </div>
                </div>
                <div className="">{renderTab()}</div>
            </div>
            <aside className="flex w-2/8 flex-col items-start px-4 pt-30"></aside>
        </div>
    );
}

export default FollowersPage;

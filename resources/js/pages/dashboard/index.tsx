import Layout from '@/layouts/Layout';
import { PostInterface, UserInterface } from '@/types';
import { ReactNode, useState } from 'react';
import Posts from './posts';
import Users from './users';

interface DashboardProps {
    posts: PostInterface[];
    users: UserInterface[];
}

function Dashboard({ users, posts }: DashboardProps) {
    const [view, setVew] = useState('posts');
    console.log('users: ', users);

    const hndleViewSelection = () => {
        if (view === 'posts') {
            setVew('users');
        } else {
            setVew('posts');
        }
    };

    const displayView = () => {
        if (view === 'posts') {
            return <Posts posts={posts} />;
        } else {
            return <Users users={users} />;
        }
    };
    return (
        <section id="dashboard" className="flex w-full flex-col md:flex-row">
            <aside className="hidden w-[20%] md:flex">
                <ul>
                    <li onClick={hndleViewSelection} className="cursor-pointer px-4 py-2 duration-200 hover:bg-white/15">
                        Posts
                    </li>
                    <li onClick={hndleViewSelection} className="cursor-pointer px-4 py-2 duration-200 hover:bg-white/15">
                        Users
                    </li>
                </ul>
            </aside>
            <aside className="mx-4 flex py-4 md:mx-0 md:hidden">
                <ul className="flex">
                    <li onClick={hndleViewSelection} className="cursor-pointer py-2 duration-200 hover:text-blue-500 hover:underline">
                        Posts/
                    </li>
                    <li onClick={hndleViewSelection} className="cursor-pointer py-2 duration-200 hover:text-blue-500 hover:underline">
                        Users/
                    </li>
                </ul>
            </aside>
            <main className="w-full md:w-[80%]">{displayView()}</main>
        </section>
    );
}

Dashboard.layout = (page: ReactNode) => <Layout children={page} />;

export default Dashboard;

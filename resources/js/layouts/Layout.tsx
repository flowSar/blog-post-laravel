import { create as createRegister } from '@/actions/App/Http/Controllers/AuthController';
import { index } from '@/actions/App/Http/Controllers/PostController';
import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import { create as createLogin, destroy } from '@/actions/App/Http/Controllers/SessionController';
import DashboardIcon from '@/components/icons/DashboardIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import LoginIcon from '@/components/icons/LoginIcon';
import LogoutIcon from '@/components/icons/LogoutIcon';
import PostsIcon from '@/components/icons/PostsIcon';
import RegisterIcon from '@/components/icons/RegisterIcon';
import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}
interface SharedProps {
    auth: {
        user: {
            id: string;
            name: string;
            role: string;
        } | null;
        flash: {
            error: string;
        };
    };
}

function Layout({ children }: LayoutProps) {
    const { auth }: any = usePage().props;
    console.log('auth: ', auth);
    // const form = useForm();
    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <header className="mt-2">
                    <nav className="border-b border-gray-800 bg-gray-900 shadow-lg">
                        <div className="mx-auto flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-1">
                                <Link
                                    href="/"
                                    className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <HomeIcon />
                                        Home
                                    </span>
                                </Link>
                                <Link
                                    preserveScroll
                                    href={index()}
                                    className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <PostsIcon />
                                        Posts
                                    </span>
                                </Link>

                                {auth.user?.role === 'admin' && (
                                    <Link
                                        href="/dashboard"
                                        className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            <DashboardIcon />
                                            Dashboard
                                        </span>
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {auth.user != null ? (
                                    <>
                                        <Link
                                            href={ProfileController.create()}
                                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                                        >
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800"></div>
                                            <span className="font-medium">{auth.user?.name}</span>
                                        </Link>
                                        <Link method="delete" className="inline-block" href={destroy()}>
                                            <div className="group flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400">
                                                <LogoutIcon />
                                                Log out
                                            </div>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={createRegister().url}
                                            className="group flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                                        >
                                            <RegisterIcon />
                                            Register
                                        </Link>
                                        <Link
                                            href={createLogin().url}
                                            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl"
                                        >
                                            <LoginIcon />
                                            Login
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="relative mx-auto mt-10 flex w-full flex-1 justify-center md:w-6xl">{children}</main>
                <footer className="mt-10 flex h-18 items-center justify-center bg-gray-900"> © 2025 My Website</footer>
            </div>
        </>
    );
}

export default Layout;

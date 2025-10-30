import { create as createRegister } from '@/actions/App/Http/Controllers/AuthController';
import { index } from '@/actions/App/Http/Controllers/PostController';
import { create as createLogin } from '@/actions/App/Http/Controllers/SessionController';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}
interface SharedProps {
    auth: {
        user: {
            id: string;
            name: string;
        } | null;
        flash: {
            error: string;
        };
    };
}

function Layout({ children }: LayoutProps) {
    const { auth }: any = usePage().props;

    console.log('auth: ', auth);

    const form = useForm();

    return (
        <>
            <header className="mt-2">
                <nav className="border-b border-gray-800 bg-gray-900 shadow-lg">
                    <div className="mx-auto flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-1">
                            <Link
                                href="/"
                                className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    Home
                                </span>
                            </Link>
                            <Link
                                preserveScroll
                                href={index()}
                                className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                        />
                                    </svg>
                                    Posts
                                </span>
                            </Link>
                            <Link
                                href=""
                                className="group relative rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    Dashboard
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            {auth.user != null ? (
                                <>
                                    <Link
                                        href={createRegister().url}
                                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-300 transition-all duration-200 hover:bg-gray-800 hover:text-white"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-800"></div>
                                        <span className="font-medium">{auth.user?.name}</span>
                                    </Link>
                                    <form
                                        className="inline-block"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            form.delete('/logout');
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="group flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Log out
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={createRegister().url}
                                        className="group flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-gray-300 transition-all duration-200 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                            />
                                        </svg>
                                        Register
                                    </Link>
                                    <Link
                                        href={createLogin().url}
                                        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-purple-500 hover:shadow-xl"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            <main className="mx-auto mt-10 flex max-w-6xl justify-center">{children}</main>
        </>
    );
}

export default Layout;

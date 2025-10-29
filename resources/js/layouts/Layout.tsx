import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className="mt-2">
                <nav className="flex justify-between bg-black px-4 py-4">
                    <div>
                        <Link href="" className="px-4 py-2 text-white hover:bg-white/10">
                            Home
                        </Link>
                        <Link href="/posts" className="px-4 py-2 text-white hover:bg-white/10">
                            Posts
                        </Link>
                        <Link href="" className="px-4 py-2 text-white hover:bg-white/10">
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <Link href="" className="px-4 py-2 text-white hover:bg-white/10">
                            Register
                        </Link>
                        <Link href="" className="px-4 py-2 text-white hover:bg-white/10">
                            login
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="mx-auto max-w-6xl">{children}</main>
        </>
    );
}

export default Layout;

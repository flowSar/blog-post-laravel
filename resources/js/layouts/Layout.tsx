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
                <nav className="flex items-center justify-between bg-black px-4 py-4">
                    <div>
                        <Link href="/" className="px-4 py-2 text-white hover:bg-white/10">
                            Home
                        </Link>
                        <Link preserveScroll href={index()} className="px-4 py-2 text-white hover:bg-white/10">
                            Posts
                        </Link>
                        <Link href="" className="px-4 py-2 text-white hover:bg-white/10">
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        {auth.user != null ? (
                            <>
                                <Link href={createRegister().url} className="px-4 py-2 text-white hover:bg-white/10">
                                    {auth.user?.name}
                                </Link>
                                <form
                                    className="inline-block"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        form.delete('/logout');
                                    }}
                                >
                                    <input type="submit" className="cursor-pointer px-4 py-2 text-white hover:bg-white/10" value="Log out" />
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href={createRegister().url} className="px-4 py-2 text-white hover:bg-white/10">
                                    Register
                                </Link>
                                <Link href={createLogin().url} className="px-4 py-2 text-white hover:bg-white/10">
                                    login
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>
            <main className="mx-auto flex max-w-6xl justify-center">{children}</main>
        </>
    );
}

export default Layout;

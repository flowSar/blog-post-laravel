import { Link } from '@inertiajs/react';

function Profile() {
    return (
        <div className="mx-auto mt-10 flex min-h-screen w-full flex-1 justify-center md:w-6xl">
            <div className="flex w-full gap-8">
                <aside className="w-1/4">
                    <Link href={''}>Profile</Link>
                </aside>
                <div className="w-2/4">
                    <div id="banner" className="relative h-72 w-full bg-white/5">
                        <div className="absolute -bottom-20 left-6 h-52 w-52 rounded-full bg-white/10"></div>
                    </div>
                    <div className="flex flex-col pt-6">
                        <Link href={''} as="button" className="cursor-pointer self-end rounded-full border px-6 py-2">
                            Edit profile
                        </Link>
                        <h1 className="mt-8 text-2xl">User Name</h1>
                    </div>
                </div>
                <aside className="w-1/4"></aside>
            </div>
        </div>
    );
}

export default Profile;

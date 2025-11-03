import { UserProps } from '@/types';

interface UsercardProps {
    user: UserProps;
}

function Usercard({ user }: UsercardProps) {
    return (
        <div className="flex gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-400"></div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex justify-between">
                    <h2>{user.name}</h2>
                    <button className="rounded-full bg-white px-6 py-1.5 font-bold text-black">Following</button>
                </div>
                <h4 className="text-sm">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis id veniam odio, atque repudiandae quod ex aliquid
                </h4>
            </div>
        </div>
    );
}

export default Usercard;

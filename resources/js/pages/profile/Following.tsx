import { UserProps } from '@/types';
import Usercard from './components/Usercard';

interface FollowingPageProps {
    users: UserProps[];
}

function Following({ users }: FollowingPageProps) {
    return (
        <div className="flex flex-col space-y-8 divide-gray-600 px-4 py-4">
            {users.map((user) => (
                <Usercard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default Following;

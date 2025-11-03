import { UserProps } from '@/types';
import Usercard from './components/Usercard';

interface FollowingPageProps {
    followers: {
        id: number;
        user: UserProps;
    }[];
}
function Followers({ followers }: FollowingPageProps) {
    return (
        <div className="flex flex-col space-y-8 divide-gray-600 px-4 py-4">
            {followers.map((follower) => (
                <Usercard key={follower.id} user={follower.user} />
            ))}
        </div>
    );
}

export default Followers;

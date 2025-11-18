import { UserInterface } from '@/types';

interface UsersProps {
    users: UserInterface[];
}
function users({ users }: UsersProps) {
    return <div className="px-4">users</div>;
}

export default users;

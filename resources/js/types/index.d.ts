export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PaginationProps<T> {
    data: T[];
    first_page_url: string;
    links: [
        {
            url: string;
            label: string;
            page: number;
            active: boolean;
        },
    ];
}

interface PostInterface {
    id: string;
    body: string;
    like: number;
    liked: boolean;
    comments: boolean;
    can_delete: boolean;
    timeAgo: string;
    created_at: string;
    updated_at: string;
    user: UserInterface;
}

interface CommentProps {
    id: string;
    body: string;
    like: number;
    liked: boolean;
    created_at: string;
    updated_at: string;
    user: UserInterface;
}
enum ROLE {
    'user',
    'admin',
}

interface UserInterface {
    id: number;
    name: string;
    email: string;
    role: string;
    profile?: ProfileInterface;
    created_at: string;
    followers_count: number;
    following_count: number;
    followed_by_auth: boolean;
}

// interface ProfileInterface {
//     id: string;
//     name: string;
//     bio: string;
//     location: string;
//     birth_date: string;
//     conver_url: string;
//     profile_img_url: string;
//     user: UserInterface;
// }

interface AuthProps {
    user: {
        id: string;
        name: string;
        role: string;
    };
}

interface ProfileInterface {
    id: string;
    name: string;
    bio: string;
    location: string;
    birth_date: string;
    cover_img_url: string;
    profile_img_url: string;
    created_at: string;
}

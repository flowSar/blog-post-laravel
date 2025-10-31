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

interface PostProps {
    id: string;
    body: string;
    like: number;
    liked: boolean;
    comments: boolean;
    created_at: string;
    updated_at: string;
    user: {
        name: string;
    };
}

interface CommentProps {
    id: string;
    body: string;
    like: number;
    liked: boolean;
    created_at: string;
    updated_at: string;
    user: {
        name: string;
    };
}

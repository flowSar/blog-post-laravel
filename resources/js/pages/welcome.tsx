import CustomButton from '@/components/CustomButton';
import Layout from '@/layouts/Layout';

interface UserProps {
    user: {
        name: string;
        email: string;
        id: string;
    };
}

function Welcome({ user }: UserProps) {
    return (
        <>
            <CustomButton value="click Me" />

            <div className="">Hello {user?.name} welcome home</div>
        </>
    );
}

Welcome.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Welcome;

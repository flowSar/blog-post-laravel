import CustomButton from '@/components/CustomButton';
import Layout from '@/layouts/Layout';

interface WelcomeProps {
    user: {
        name: string;
        age: number;
    };
}

function Welcome({ user }: WelcomeProps) {
    return (
        <>
            <Layout>
                <CustomButton value="click Me" />
                <div className="bg-gray-300">Hello {user.name} welcome home</div>
                <p>age: {user.age}</p>
            </Layout>
        </>
    );
}

export default Welcome;

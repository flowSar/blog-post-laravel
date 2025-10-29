import CustomButton from '@/components/CustomButton';
import Layout from '@/layouts/Layout';

function Welcome() {
    return (
        <>
            <Layout>
                <CustomButton value="click Me" />
                <div className="bg-gray-300">Hello welcom home</div>
            </Layout>
        </>
    );
}

export default Welcome;

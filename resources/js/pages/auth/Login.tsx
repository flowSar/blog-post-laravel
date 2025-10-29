import Layout from '@/layouts/Layout';

function Login() {
    return <div>Login</div>;
}

Login.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Login;

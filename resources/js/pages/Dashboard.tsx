import Layout from '@/layouts/Layout';
import { ReactNode } from 'react';

function Dashboard() {
    return <div>Dashboard</div>;
}

Dashboard.layout = (page: ReactNode) => <Layout children={page} />;

export default Dashboard;

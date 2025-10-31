import ThreeDots from '@/components/icons/ThreeDots';
import Layout from '@/layouts/Layout';
import { ChangeEvent, useState } from 'react';

interface UserProps {
    user: {
        name: string;
        email: string;
        id: string;
    };
}

function Index({ user }: UserProps) {
    interface InputProps {
        name: string;
        email: string;
    }
    const [inputValue, setInputValue] = useState<InputProps>({
        name: '',
        email: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue((data) => ({ ...data, [e.target.name]: e.target.value }));
        console.log(inputValue);
        // setInputValue(data => {...data, name: 'brahim'});
        // setName(e.target.value);
    };

    return (
        <>
            <div>
                <ThreeDots />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;

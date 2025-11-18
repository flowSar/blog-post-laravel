import ThreeDots from '@/components/icons/ThreeDots';
import Layout from '@/layouts/Layout';
import { ProfileInterface } from '@/types';
import { ChangeEvent, useState } from 'react';

interface UserInterface {
    user: {
        name: string;
        email: string;
        id: string;
        profile: ProfileInterface;
    };
}

function Index({ user }: UserInterface) {
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

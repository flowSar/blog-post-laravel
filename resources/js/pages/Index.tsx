import TextInput from '@/components/TextInput';
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
                <TextInput name="name" label="Name: " value={inputValue.name} onChangeInput={handleInputChange} />

                <TextInput name="email" label="Email: " value={inputValue.email} onChangeInput={handleInputChange} />

                <button className="mt-4 cursor-pointer bg-white/25 px-8 py-2" onClick={() => console.log(inputValue)}>
                    Print
                </button>
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;

import CustomButton from '@/components/CustomButton';
import TextInput from '@/components/TextInput';
import Layout from '@/layouts/Layout';
import { useForm, usePage } from '@inertiajs/react';
import React from 'react';

type FormKeys = 'name' | 'email' | 'password' | 'password_confirmation';

function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.name as FormKeys;
        form.setData(key, e.target.value);
    }
    const { flash }: any = usePage().props;
    console.log('res: ', flash.error);

    return (
        <>
            <div className="mt-10">
                <h1 className="py-6 text-center text-5xl tracking-widest uppercase">Register</h1>
                {flash.error && <div className="text-center text-sm text-red-500">{flash.error}</div>}
                <form
                    className="flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log('submit form');
                        form.post('/register');
                    }}
                >
                    <div>
                        <TextInput label="Name:" name={'name'} value={form.data.name} onChangeInput={handleFormChange} className="w-[24rem]" />
                        {form.errors.name ? <p className="text-sm text-red-500">{form.errors.name}</p> : ''}
                    </div>

                    <div>
                        <TextInput label="Email:" name={'email'} value={form.data.email} onChangeInput={handleFormChange} className="w-[24rem]" />
                        {form.errors.email ? <p className="text-sm text-red-500">{form.errors.email}</p> : ''}
                    </div>

                    <div>
                        <TextInput
                            label="Password:"
                            type="password"
                            name={'password'}
                            value={form.data.password}
                            onChangeInput={handleFormChange}
                            className="w-[24rem]"
                        />
                        {form.errors.password ? <p className="text-sm text-red-500">{form.errors.password}</p> : ''}
                    </div>

                    <div>
                        <TextInput
                            label="Confirm Password:"
                            type="password"
                            name={'password_confirmation'}
                            value={form.data.password_confirmation}
                            onChangeInput={handleFormChange}
                            className="w-[24rem]"
                        />
                    </div>

                    <div className="text-center">
                        <CustomButton disabled={form.processing} value={form.processing ? 'sumbmiting...' : 'Register'} />
                    </div>
                </form>
            </div>
        </>
    );
}

Register.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Register;

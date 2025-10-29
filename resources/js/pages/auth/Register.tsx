import CustomButton from '@/components/CustomButton';
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
                    <label htmlFor="name" className="mt-4">
                        Name:{' '}
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.data.name}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                        onChange={handleFormChange}
                    />
                    {form.errors.name ? <p className="text-sm text-red-500">{form.errors.name}</p> : ''}
                    <label htmlFor="email" className="mt-4">
                        Email:{' '}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={form.data.email}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                        onChange={handleFormChange}
                    />
                    {form.errors.email ? <p className="text-sm text-red-500">{form.errors.email}</p> : ''}
                    <label htmlFor="password" className="mt-4">
                        Password:{' '}
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.data.password}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                        onChange={handleFormChange}
                    />
                    {form.errors.password ? <p className="text-sm text-red-500">{form.errors.password}</p> : ''}
                    <label htmlFor="confirmation_password" className="mt-4">
                        Confirm Password:{' '}
                    </label>
                    <input
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={form.data.password_confirmation}
                        onChange={handleFormChange}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                    />

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

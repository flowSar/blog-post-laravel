import Layout from '@/layouts/Layout';
import { useForm, usePage } from '@inertiajs/react';

type formKey = 'email' | 'password';

function Login() {
    const form = useForm({
        email: '',
        password: '',
    });

    const { flash }: any = usePage().props;

    const submitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('/login');
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as formKey;
        form.setData(key, e.target.value);
    };

    return (
        <>
            <div className="mt-10">
                <h1 className="py-6 text-center text-5xl tracking-widest uppercase">Log In</h1>
                {flash.error && <div className="text-center text-sm text-red-500">{flash.error}</div>}

                <form className="flex flex-col" onSubmit={submitForm}>
                    <label htmlFor="name" className="mt-4">
                        Email:{' '}
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={form.data.email}
                        onChange={handleFormData}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                    />
                    {form.errors.email ? <p className="text-sm text-red-500">{form.errors.email}</p> : ''}
                    <label htmlFor="name" className="mt-4">
                        Pssword:{' '}
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.data.password}
                        onChange={handleFormData}
                        className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                    />
                    {form.errors.password ? <p className="text-sm text-red-500">{form.errors.password}</p> : ''}

                    <div className="self-center">
                        <input
                            type="submit"
                            value={'LogIn'}
                            className="my-2 cursor-pointer rounded-lg bg-white/10 px-8 py-2 font-bold hover:bg-white/15 focus:outline-none"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

Login.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Login;

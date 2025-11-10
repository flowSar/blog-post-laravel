import InputError from '@/components/InputError';
import TextInput from '@/components/TextInput';
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
            <div className="mt-6 mb-10">
                <div className="overflow-hidden rounded-lg bg-gray-100 shadow-xl shadow-black/15 dark:bg-white/10">
                    <div className="bg-blue-500 px-10 py-12 shadow-md shadow-black/15">
                        <h1 className="py-6 text-center text-5xl font-bold tracking-widest text-white uppercase">Log In</h1>
                    </div>

                    {flash.error && <div className="text-center text-sm text-red-500">{flash.error}</div>}

                    <form className="flex flex-col px-10 py-6" onSubmit={submitForm}>
                        <TextInput
                            name="email"
                            type="email"
                            label="Email: "
                            value={form.data.email}
                            onChangeInput={handleFormData}
                            className="bg-white"
                        />
                        <InputError error={form.errors.email} />

                        <TextInput
                            name="password"
                            type="password"
                            label="Password: "
                            value={form.data.password}
                            onChangeInput={handleFormData}
                            className="bg-white"
                        />
                        <InputError error={form.errors.password} />

                        <div className="mt-4 self-center">
                            <input
                                type="submit"
                                value={'LogIn'}
                                className="my-2 cursor-pointer rounded-lg bg-gray-300 px-8 py-2 font-bold duration-200 hover:bg-gray-400 focus:outline-none dark:bg-white/10 dark:hover:bg-white/15"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Login.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Login;

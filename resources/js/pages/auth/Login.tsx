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
            <div className="mt-10">
                <h1 className="py-6 text-center text-5xl tracking-widest uppercase">Log In</h1>
                {flash.error && <div className="text-center text-sm text-red-500">{flash.error}</div>}

                <form className="flex flex-col" onSubmit={submitForm}>
                    <TextInput name="email" type="email" label="Email: " value={form.data.email} onChangeInput={handleFormData} />
                    <InputError error={form.errors.email} />

                    <TextInput name="password" type="password" label="Password: " value={form.data.password} onChangeInput={handleFormData} />
                    <InputError error={form.errors.password} />

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

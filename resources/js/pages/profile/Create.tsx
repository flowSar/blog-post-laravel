import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import TextInput from '@/components/TextInput';
import { UserProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, useRef, useState } from 'react';

interface CreateProps {
    user: UserProps;
}

function Create({ user }: CreateProps) {
    const profileImgInputRef = useRef<HTMLInputElement>(null);
    const coverImgInputRef = useRef<HTMLInputElement>(null);

    const [previewProdileImg, setPreviewProdileImg] = useState<string | null>(null);
    const [previewCoverImg, setPreviewCoverImg] = useState<string | null>(null);

    const { data, setData, errors, post, processing } = useForm({
        bio: '',
        location: '',
        profile_img: null as File | null,
        cover_img: null as File | null,
        birth_date: '',
    });

    const handleFileLoding = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file && e.target.name === 'profile_img') {
            setData('profile_img', file);
            setPreviewProdileImg(URL.createObjectURL(file));
        } else if (file && e.target.name === 'cover_img') {
            setData('cover_img', file);
            setPreviewCoverImg(URL.createObjectURL(file));
        }
    };

    const loadProfileImg = () => {
        if (profileImgInputRef.current) {
            profileImgInputRef.current.click();
        }
    };

    const loadCoverImg = () => {
        if (coverImgInputRef.current) {
            coverImgInputRef.current.click();
        }
    };

    const submitForm = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        post(ProfileController.store(user.name).url);
    };

    return (
        <div className="mx-auto mt-10 flex h-screen max-w-2xl flex-col items-center scroll-auto">
            <div className="relative h-[200px] w-[80%]">
                <div onClick={loadCoverImg} className="h-[200px] w-full cursor-pointer border-none bg-white/10">
                    <div className="group relative flex h-full w-full items-center justify-center">
                        <img
                            src="http://localhost:8000/images/upload-img.png"
                            className="absolute h-32 w-32 opacity-0 duration-300 group-hover:opacity-100"
                        />
                        <img src={previewCoverImg ?? ''} className="h-full w-full object-cover" />
                    </div>

                    <input
                        ref={coverImgInputRef}
                        name="cover_img"
                        onChange={handleFileLoding}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        hidden
                    />
                </div>
                <div
                    onClick={loadProfileImg}
                    className="absolute -bottom-20 left-6 h-32 w-32 cursor-pointer overflow-hidden rounded-full bg-white/25"
                >
                    <div className="group relative flex h-full w-full items-center justify-center">
                        <img
                            src="http://localhost:8000/images/upload-img.png"
                            className="absolute h-18 w-18 opacity-0 duration-300 group-hover:opacity-100"
                        />
                        <img src={previewProdileImg ?? ''} className="h-full w-full object-cover" />
                    </div>

                    <input
                        ref={profileImgInputRef}
                        name="profile_img"
                        onChange={handleFileLoding}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        hidden
                    />
                </div>
            </div>

            <form onSubmit={submitForm} className="mt-20 flex w-full flex-col items-center md:w-4/6">
                <div className="w-full py-3">
                    {errors.cover_img ? <p className="text-sm text-red-500">{errors.cover_img}</p> : ''}
                    {errors.profile_img ? <p className="text-sm text-red-500">{errors.profile_img}</p> : ''}
                </div>
                <div className="mt-4">
                    <label htmlFor="bio" className="block">
                        bio:
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        className="focus:outline-non my-2 w-[26rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                        rows={3}
                    ></textarea>
                    {errors.bio ? <p className="text-sm text-red-500">{errors.bio}</p> : ''}
                </div>
                <div>
                    <TextInput
                        label="location: "
                        name={'location'}
                        value={data.location}
                        className="w-[26rem]"
                        onChangeInput={(e) => setData('location', e.target.value)}
                    />
                    {errors.location ? <p className="text-sm text-red-500">{errors.location}</p> : ''}
                </div>

                <div>
                    <TextInput
                        label="Birth Date: "
                        name={'birth_date'}
                        type="date"
                        value={data.birth_date ?? ''}
                        className="w-[26rem]"
                        onChangeInput={(e) => setData('birth_date', e.target.value)}
                    />
                    {errors.birth_date ? <p className="text-left text-sm text-red-500">{errors.birth_date}</p> : ''}
                </div>

                <input type="submit" value={'Register'} className="mt-4 mb-10 cursor-pointer rounded-full bg-white/10 px-6 py-2" />
            </form>
        </div>
    );
}

export default Create;

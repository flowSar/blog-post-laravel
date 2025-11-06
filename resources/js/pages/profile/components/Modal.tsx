import ProfileController from '@/actions/App/Http/Controllers/ProfileController';
import { ProfileProps, UserProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import React, { ChangeEvent, useRef, useState } from 'react';

interface ModalProps {
    dialogref: React.RefObject<HTMLDialogElement | null>;
    profile: ProfileProps;
    user: UserProps;
}

// interface UserProps {
//     name: string;
//     bio: string;
//     location: string;
//     profile_img: File | null;
//     cover_img: File | null;
// }

type key = 'name' | 'bio' | 'location' | 'profile_img' | 'cover_img';

function Modal({ dialogref, profile, user }: ModalProps) {
    const [previewProfilaImg, setPreviewProfileImg] = useState<string | null>(null);
    const [previewCoverImg, setPreviewCoverImg] = useState<string | null>(null);

    console.log('profile: ', profile);

    const { data, setData, post, put, processing, errors } = useForm({
        name: profile?.name ?? '',
        bio: profile?.bio ?? '',
        location: profile?.location ?? '',
        profile_img: null as File | null,
        cover_img: null as File | null,
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const inputCoverRef = useRef<HTMLInputElement>(null);

    const handleSaveChanges = () => {
        console.log('errors: ', errors);
        dialogref.current?.close();
    };

    const handleCloseModal = () => {
        dialogref.current?.close();
    };

    const uploadProfileImage = () => {
        inputRef.current?.click();
    };

    const uploadCoverImage = () => {
        inputCoverRef.current?.click();
    };

    const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as key;

        if (key === 'profile_img' || key === 'cover_img') {
            const file = e.target.files ? e.target.files[0] : null;
            setData(key, file);
            if (file && key === 'profile_img') {
                setPreviewProfileImg(URL.createObjectURL(file)); // temporary local URL
            } else if (file && key === 'cover_img') {
                setPreviewCoverImg(URL.createObjectURL(file));
            }
        } else {
            setData(key, e.target.value);
        }
    };

    const handleTextareaDataChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('bio', e.target.value);
    };

    const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('fuck0--------------------------');
        router.post(ProfileController.update(user.name).url, {
            _method: 'put',
            name: data.name ?? profile?.name,
            bio: data.bio ?? profile?.bio,
            location: data.location ?? profile?.location,
            profile_img: data.profile_img ?? profile?.profile_img_url,
            cover_img: data.cover_img ?? profile?.cover_img_url,
        });
    };

    return (
        <dialog className="rounded-xl bg-black px-8 py-4 shadow-sm shadow-gray-100" ref={dialogref}>
            <form onSubmit={handleFormSubmit} className="container" encType="multipart/form-data">
                <header className="flex items-center justify-between">
                    <div className="flex gap-4 text-white">
                        <button onClick={handleCloseModal} className="cursor-pointer rounded-full px-2 py-1 text-2xl font-bold hover:bg-white/10">
                            X
                        </button>
                        <h1 className="text-2xl">Edit profile</h1>
                    </div>
                    <div>
                        <button onClick={handleSaveChanges} className="cursor-pointer rounded-full bg-white px-6 py-2 text-black">
                            Save
                        </button>
                    </div>
                </header>
                <main className="dialog-content mt-4 flex flex-col">
                    <div className="relative">
                        <div id="banner" className="flex h-48 w-full cursor-pointer items-center justify-center bg-white/5">
                            <div onClick={uploadCoverImage} className="group relative flex h-full w-full items-center justify-center">
                                <img src={previewCoverImg ?? `/storage/${profile?.cover_img_url}`} className="h-full w-full object-cover" />
                                <input ref={inputCoverRef} onChange={handleDataChange} name="cover_img" type="file" accept="image/*" hidden />
                                <img
                                    className="absolute h-16 w-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    src="http://localhost:8000/images/upload.png"
                                />
                            </div>

                            <div
                                onClick={uploadProfileImage}
                                className="group absolute -bottom-20 left-6 flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/10"
                            >
                                <div className="group flex h-full w-full items-center justify-center">
                                    <img
                                        className="absolute top-8 left-8 h-16 w-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        src="http://localhost:8000/images/upload.png"
                                    />
                                    <img
                                        src={previewProfilaImg ?? `/storage/${profile?.profile_img_url}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                    <input ref={inputRef} name="profile_img" accept="image/*" type="file" onChange={handleDataChange} hidden />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24 flex flex-col gap-2">
                        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                            <label htmlFor="name" className="text-sm">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 focus:ring-0 focus:outline-none"
                                placeholder="Name"
                                value={data.name}
                                onChange={handleDataChange}
                            />
                            {errors ? <p className="text-sm text-red-400">{errors.name}</p> : ''}
                        </div>
                        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                            <label htmlFor="bio" className="text-sm">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                rows={3}
                                name="bio"
                                value={data.bio ?? ''}
                                onChange={handleTextareaDataChange}
                                className="mt-1 focus:ring-0 focus:outline-none"
                                placeholder="Bio"
                            ></textarea>
                        </div>
                        <div className="flex flex-col rounded-lg border border-gray-700 px-4 py-2 text-white focus-within:border-2 focus-within:border-blue-500">
                            <label htmlFor="location" className="text-sm">
                                Location
                            </label>
                            <input
                                id="location"
                                name="location"
                                value={data.location ?? ''}
                                onChange={handleDataChange}
                                className="mt-1 focus:ring-0 focus:outline-none"
                                placeholder="location"
                            ></input>
                        </div>
                    </div>
                </main>
            </form>
        </dialog>
    );
}

export default Modal;

{
    /* <img src="http://localhost:8000/images/banner.png" className="object-center" /> */
}

{
    /* <input ref={inputRef} name="profile_img" accept="image/*" type="file" onChange={handleDataChange} hidden /> */
}
{
    /* <img className="hidden h-16 w-16 duration-300 group-hover/profile:flex" src="http://localhost:8000/images/upload.png" /> */
}

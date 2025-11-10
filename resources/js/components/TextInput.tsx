import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface TextInputProps {
    name: string;
    label?: string;
    id?: string;
    type?: string;
    value: string;
    className?: string;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ name, label, id, className, type = 'text', value, onChangeInput }: TextInputProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mt-4">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                className={twMerge(`my-2 w-[24rem] rounded-lg px-4 py-4 focus:outline-none dark:bg-white/10`, className)}
                onChange={onChangeInput}
            />
        </div>
    );
}

export default TextInput;

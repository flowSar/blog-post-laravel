import { ChangeEvent } from 'react';

interface TextInputProps {
    name: string;
    label?: string;
    id?: string;
    type?: string;
    value: string;
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

function TextInput({ name, label, id, type = 'text', value, onChangeInput }: TextInputProps) {
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
                className="my-2 w-[20rem] rounded-lg bg-white/10 px-4 py-4 focus:outline-none"
                onChange={onChangeInput}
            />
        </div>
    );
}

export default TextInput;

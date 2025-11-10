interface CustomButtonProps {
    value: string;
    disabled?: boolean;
}

function CustomButton({ value, disabled }: CustomButtonProps) {
    return (
        <button
            disabled={disabled}
            type="submit"
            className="my-2 cursor-pointer rounded-lg bg-gray-300 px-8 py-2 font-bold duration-200 hover:bg-gray-400 focus:outline-none dark:bg-white/10 dark:hover:bg-white/15"
        >
            {value}
        </button>
    );
}

export default CustomButton;

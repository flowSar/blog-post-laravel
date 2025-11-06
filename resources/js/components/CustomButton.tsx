interface CustomButtonProps {
    value: string;
    disabled?: boolean;
}

function CustomButton({ value, disabled }: CustomButtonProps) {
    return (
        <button
            disabled={disabled}
            type="submit"
            className="mx-4 my-2 cursor-pointer rounded-md bg-white/10 px-6 py-2 text-white duration-200 hover:bg-white/15"
        >
            {value}
        </button>
    );
}

export default CustomButton;

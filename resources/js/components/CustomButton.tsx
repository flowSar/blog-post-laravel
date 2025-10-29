interface CustomButtonProps {
    value: string;
}

function CustomButton({ value }: CustomButtonProps) {
    return <button className="mx-4 my-2 rounded-md bg-gray-300 px-6 py-2 text-white duration-200 hover:bg-gray-500">Click me</button>;
}

export default CustomButton;

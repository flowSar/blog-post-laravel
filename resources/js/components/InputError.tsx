type ErrorProps = {
    error: string | undefined;
};

function InputError({ error }: ErrorProps) {
    if (error) {
        return <p className="mt-1 text-sm text-red-500">{error}</p>;
    }
    return <></>;
}

export default InputError;

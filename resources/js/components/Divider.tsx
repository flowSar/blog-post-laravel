function Divider({ label }: { label?: string }) {
    return (
        <div className={`my-4 flex w-full items-center ${label ? 'gap-2' : ''}`}>
            <span className="inline-block h-0.5 w-10 flex-1 bg-white/25"></span>
            <p>{label}</p>
            <span></span>
            <span className="inline-block h-0.5 w-10 flex-1 bg-white/25"></span>
        </div>
    );
}

export default Divider;

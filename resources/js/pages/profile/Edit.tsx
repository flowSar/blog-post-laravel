function Edit() {
    return (
        <div className="mx-auto mt-10 flex min-h-screen w-full flex-1 justify-center md:w-6xl">
            <div className="w-full">
                <div className="h-52 w-52 rounded-full bg-white/10"></div>
                <form className="grid grid-cols-2">
                    <div>
                        <label>First name</label>
                        <input type="text" name="firstname" className="px-4 py-2" />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input type="text" name="firstname" className="px-4 py-2" />
                    </div>
                    <div>
                        <label>Birth day</label>
                        <input type="date" name="firstname" className="px-4 py-2" />
                    </div>
                    <div>
                        <label>First name</label>
                        <input type="text" name="firstname" className="px-4 py-2" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;

const Searchbar = ({ inputValue, onChange, searchValue, onEnter }) => {
    return (
        <div
            className="flex w-full h-14 bg-white items-center
                        rounded-full border border-slate-300 md:p-2
                        focus-within:border-black"
        >
            <input
                type="text"
                className="px-4 text-sm border-none focus:outline-none focus:ring-0 flex-1"
                placeholder="Search for restaurants, cuisines, dishes, etc..."
                value={inputValue}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onEnter}
            />
        </div>
    );
};

export default Searchbar;

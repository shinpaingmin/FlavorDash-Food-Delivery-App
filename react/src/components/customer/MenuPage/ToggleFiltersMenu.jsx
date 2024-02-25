const ToggleFiltersMenu = ({
    sortOptions,
    cuisines,
    Filter,
    category,
    setCategory,
    option,
    setOption,
    setIsToggleOptions,
}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen hideScrollbar overflow-y-scroll z-[999] bg-black/90 ease-in">
            <span
                className="text-white text-5xl absolute top-0 right-4 cursor-pointer"
                onClick={setIsToggleOptions}
            >
                &times;
            </span>
            <div className="my-12">
                <div className="mb-5 mt-12">
                    <h1 className="mb-6 text-xl text-center text-orange font-bold">
                        Sort by
                    </h1>

                    <div className="flex items-start mx-auto flex-col w-max">
                        {sortOptions.map((sort) => (
                            <Filter
                                key={sort.id}
                                category={option}
                                setCategory={setOption}
                                {...sort}
                                customClass="text-white"
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h1 className="mb-6 text-xl text-orange font-bold text-center">
                        Filter by Cuisines
                    </h1>

                    <div className="flex flex-col items-start mx-auto w-max">
                        {cuisines.map((cuisine) => (
                            <Filter
                                key={cuisine.id}
                                category={category}
                                setCategory={setCategory}
                                {...cuisine}
                                customClass="text-white"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToggleFiltersMenu;

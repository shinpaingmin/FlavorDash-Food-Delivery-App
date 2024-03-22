import { useEffect, useState } from "react";
import {
    useAddRestaurantToFavoriteMutation,
    useGetAllRestaurantsQuery, useGetDietariesQuery, useGetRestaurantTypesQuery,
} from "../../services";

import { LuSettings2 } from "react-icons/lu";
import Filter from "../../components/customer/FeedPage/Filter";
import Searchbar from "../../components/customer/FeedPage/Searchbar";
import { sortOptions } from "../../constants/sortData";
import StoreCard from "../../components/customer/FeedPage/StoreCard";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavButtons from "../../components/customer/FeedPage/SwiperNavButtons";

import "swiper/css";
import ToggleFiltersMenu from "../../components/customer/MenuPage/ToggleFiltersMenu";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useSearchParams } from "react-router-dom";
import { noStoreFound } from "../../assets/images";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function FeedPage() {
    const [isToggleOptions, _setIsToggleOptions] = useState(false);
    const [queryParameters, setQueryParameters] = useSearchParams();
    const {data:types, isLoading: typesIsLoading} = useGetRestaurantTypesQuery();
    const {data: dietaries, isLoading: dietariesIsLoading } = useGetDietariesQuery();
    const [searchValue, setSearchValue] = useState({
        searchTownship: "",
        sortBy: "relevant",
        filterByCuisine: "all",
        filterByDietary: "",
        filterByPrice: "",
        filterByRating: "",
        filterBySearch: "",
    });
    const [inputValue, setInputValue] = useState("");

    const {
        data: stores = [],
        isLoading,
    } = useGetAllRestaurantsQuery(searchValue);
// console.log(stores?.data)

    const [addRestaurantToFavorite, {isSuccess, isError, error}] = useAddRestaurantToFavoriteMutation();

    const addToFavorite = (id) => {
        console.log(id)
        addRestaurantToFavorite(id);
    }

    const sortByHandler = (e) => {
        setSearchValue(prev => ({
            ...prev, sortBy: e.target.value,
        }));
    }

    const filterByCuisineHandler = (e) => {
        setSearchValue(prev => ({
            ...prev, filterByCuisine: e.target.value,
        }));
    }

    const filterByDietaryHandler= (value) => {
        setSearchValue(prev => ({
            ...prev, filterByDietary: value,
        }));
    }

    const filterByPriceHandler = (value) => {
        setSearchValue(prev => ({
            ...prev, filterByPrice: value,
        }));
    }

    const setSelectedRatingStars = (value) => {
        setSearchValue(prev => ({
            ...prev, filterByRating: value,
        }));
    }

    const clearRatingStars = () => {
        setSearchValue(prev => ({
            ...prev, filterByRating: "",
        }));
    }

    const clearAllFilters = () => {
        setSearchValue(prev => ({
            ...prev,
            sortBy: "relevant",
            filterByCuisine: "all",
            filterByDietary: "",
            filterByPrice: "",
            filterByRating: "",
            filterBySearch: "",
        }));
        setInputValue("")
    }

    // success message box
    function successBox(text) {
        toast.success(text, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });
    }

    function errorBox(text) {
        toast.error(text, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#fecaca",
            },
        });
    }

    function clearStatusParam() {
        setQueryParameters({
            status: "",
        }); // clear params
    }

    useEffect(() => {
        // return from email verification link
        if (queryParameters.get("status") === "emailVerified") {
            successBox("Email verified successfully!");
            clearStatusParam();
        }

        if (queryParameters.get("status") === "loggedIn") {
            successBox("Logged in successfully!!");
            clearStatusParam();
        }

        if (queryParameters.get("status") === "signUp") {
            successBox("User account created successfully!!");
            clearStatusParam();
        }

        if (queryParameters.get("searchTownship")) {
            const modifiedValue = queryParameters.get("searchTownship").trim(); // same as replace("%20", " ")
            localStorage.setItem("searchTownship", modifiedValue);
            setSearchValue(prev => ({
                ...prev, searchTownship: modifiedValue
            }));
        } else {
            const searchTownship = localStorage.getItem("searchTownship");
            setQueryParameters({
                searchTownship,
            });
            setSearchValue(prev => ({
                ...prev, searchTownship
            }));
        }


    }, [queryParameters.get("searchTownship")]);

    useEffect(() => {
        if(isSuccess) {
            successBox("Added the restaurant to your favorite list!");
        } else if(isError) {
            errorBox(error?.data?.message);
        }

    }, [isSuccess, isError]);

    const setIsToggleOptions = () => {
        if (isToggleOptions) {
            _setIsToggleOptions(!isToggleOptions);
            document.body.classList.remove("stop-scrolling");
        } else {
            _setIsToggleOptions(!isToggleOptions);
            document.body.classList.add("stop-scrolling");
        }
    };

    // listen for enter key search bar
    const onEnter = (e) => {
        if (e.key === "Enter") {
            setSearchValue(prev => ({
                ...prev, filterBySearch: e.target.value,
            }));
        }
    };

    const onChange = (value) => {
        setInputValue(value);
    };

    return (
        <div className="flex px-4 md:px-8 pt-16 border-t border-t-gray-200 ">
            {<Toaster />}
            <div
                className="hidden md:block w-1/4 sticky top-[100px]
                             shadow-sm h-[550px] overflow-y-scroll"
            >
                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Sort by</h1>

                    {sortOptions.map((sort) => (
                        <Filter
                            key={sort.id}
                            onClick={sortByHandler}
                            activeOption={searchValue.sortBy}
                            {...sort}
                        />
                    ))}
                </div>

                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Filter by Cuisines</h1>
                            <Filter
                                key={0}
                                onClick={filterByCuisineHandler}
                                activeOption={searchValue.filterByCuisine}
                                id={0}
                                name="all"
                            />
                    {
                        typesIsLoading ? (
                            <div>Loading ...</div>
                        ) : (
                            types?.data ? (
                                types.data.map((type) => (
                                    <Filter
                                        key={type.id}
                                        onClick={filterByCuisineHandler}
                                        activeOption={searchValue.filterByCuisine}
                                        id={type.id}
                                        name={type.type}
                                    />
                                ))
                            ) : (
                                <div>No data ...</div>
                            )
                        )
                    }
                </div>

                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Filter by Dietaries</h1>

                    {
                        dietariesIsLoading ? (
                            <div>Loading ...</div>
                        ) : (
                            dietaries?.data ? (
                                dietaries.data.map((dietary) => (
                                    <button type="button" key={dietary.id}
                                    className={`capitalize px-3 py-1 border border-gray-400 mr-3
                                     hover:bg-orange rounded-full ${searchValue.filterByDietary === dietary.name ? "bg-orange text-white" : "bg-white text-black"}`}
                                    onClick={() => filterByDietaryHandler(searchValue.filterByDietary === dietary.name ? "" : dietary.name)}

                                >{dietary.name}</button>
                                ))
                            ) : (
                                <div>No data ...</div>
                            )
                        )
                    }

                </div>

                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Filter by Price</h1>
                    <button type="button"
                        className={`capitalize px-3 py-1 border border-gray-400 mr-3
                            hover:bg-orange rounded-full ${searchValue.filterByPrice === "$" ? "bg-orange text-white" : "bg-white text-black"}`}
                        onClick={() => filterByPriceHandler(searchValue.filterByPrice === "$" ? "" : "$")}

                    >$</button>

                    <button type="button"
                        className={`capitalize px-3 py-1 border border-gray-400 mr-3
                            hover:bg-orange rounded-full ${searchValue.filterByPrice === "$$" ? "bg-orange text-white" : "bg-white text-black"}`}
                        onClick={() => filterByPriceHandler(searchValue.filterByPrice === "$$" ? "" : "$$")}

                    >$$</button>

                    <button type="button"
                        className={`capitalize px-3 py-1 border border-gray-400 mr-3
                            hover:bg-orange rounded-full ${searchValue.filterByPrice === "$$$" ? "bg-orange text-white" : "bg-white text-black"}`}
                        onClick={() => filterByPriceHandler(searchValue.filterByPrice === "$$$" ? "" : "$$$")}

                    >$$$</button>
                </div>

                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Filter by Rating</h1>
                    {
                        !searchValue.filterByRating ? (
                            <div className=" flex items-center">
                                <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars("1")} />
                                <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars("2")} />
                                <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars("3")} />
                                <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars("4")} />
                                <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars("5")} />
                            </div>
                        ) : (
                            <div className="flex items-center">

                                {
                                    [...Array(5)].map((_ , i) => (
                                        i < searchValue.filterByRating ? (
                                            <FaStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars(i+1)} key={i} />
                                        ) : (
                                            <FaRegStar color="#ff9529" size={20} className="mr-1 cursor-pointer" onClick={() => setSelectedRatingStars(i+1)} key={i} />
                                        )
                                    ))
                                }
                            </div>

                        )
                    }
                    <button className="mt-5 px-4 py-2 rounded-md text-white bg-orange w-3/4 hover:bg-orange/90" onClick={clearRatingStars}>Clear rating stars</button>

                </div>
                <button className="my-3 px-4 py-2 rounded-md text-white bg-orange w-3/4 hover:bg-orange/90" onClick={clearAllFilters}>Clear all filters</button>
            </div>

            <div className="w-full md:w-3/4 md:pl-5">
                <div className="flex items-center justify-between max-md:mb-14">
                    <Searchbar
                        onChange={onChange}
                        inputValue={inputValue}
                        searchValue={searchValue}
                        onEnter={onEnter}
                    />
                    <button
                        type="button"
                        className="block md:hidden flex-auto ml-3"
                        onClick={setIsToggleOptions}
                    >
                        <LuSettings2 size={24} className="text-gray-700" />
                    </button>

                    {isToggleOptions && (
                        <ToggleFiltersMenu
                            sortOptions={sortOptions}
                            cuisines={cuisines}
                            Filter={Filter}
                            sortByHandler={sortByHandler}
                            filterByCuisineHandler={filterByCuisineHandler}
                            setIsToggleOptions={setIsToggleOptions}
                        />
                    )}
                </div>

                {/* <div className="mt-10">
                    <h1 className="text-3xl mb-5">Order it again</h1>

                    <Swiper
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            },
                            340: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>
                        <SwiperNavButtons />
                    </Swiper>
                </div> */}

                <div className="mt-10">
                    <h1 className="text-3xl mb-5">All restaurants</h1>


                    {
                    isLoading ? (
                        <div className="text-center text-2xl font-semibold text-gray-500">Loading ...</div>
                    ) : (
                        stores?.data ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-8">
                                {
                                    stores.data.map((store, i) => (
                                        <StoreCard key={i} {...store}
                                                addToFavorite={addToFavorite}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="w-72 h-72 overflow-hidden mx-auto">
                                <img
                                    src={noStoreFound}
                                    alt="no restaurant found"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )
                    )
                    }

                </div>
            </div>
        </div>
    );
}

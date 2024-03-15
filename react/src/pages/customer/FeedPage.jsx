import { useEffect, useState } from "react";
import { cuisines } from "../../constants/cuisineData";
import {
    useGetAllRestaurantsQuery,
    useGetRestaurantsByOrderedQuery,
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

export default function FeedPage() {
    const [option, setOption] = useState("relevant");
    const [category, setCategory] = useState("all");
    const [isToggleOptions, _setIsToggleOptions] = useState(false);
    const [queryParameters, setQueryParameters] = useSearchParams();
    const [searchValue, setSearchValue] = useState(
        queryParameters.get("searchTownship")?.trim() ||
            localStorage.getItem("searchTownship")
    );
    const [inputValue, setInputValue] = useState("");

    const {
        data: stores = [],
        isError,
        error,
        isLoading,
    } = useGetAllRestaurantsQuery(searchValue);

    useEffect(() => {
        if (isError) {
            if (error?.status == 401 || error?.status == 403) {
                localStorage.clear();
                return <Navigate to="/login" />;
            }
        }
    }, [isError]);

    // success message box
    function successBox(text) {
        toast.success(text, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });

        setQueryParameters({
            status: "",
        }); // clear params
    }

    useEffect(() => {
        // return from email verification link
        if (queryParameters.get("status") === "emailVerified") {
            successBox("Email verified successfully!");
        }

        if (queryParameters.get("status") === "loggedIn") {
            successBox("Logged in successfully!!");
        }

        if (queryParameters.get("status") === "signUp") {
            successBox("User account created successfully!!");
        }

        if (queryParameters.get("searchTownship")) {
            const modifiedValue = queryParameters.get("searchTownship").trim(); // same as replace("%20", " ")
            localStorage.setItem("searchTownship", modifiedValue);
            setSearchValue(modifiedValue);
        } else {
            const searchTownship = localStorage.getItem("searchTownship");
            setQueryParameters({
                searchTownship,
            });
        }
    }, [queryParameters.get("searchTownship")]);

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
            // setSearchValue(inputValue);
            // setQueryParameters({
            //     searchTownship: inputValue,
            // });
            // localStorage.setItem("searchTownship", inputValue);
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
                            category={option}
                            setCategory={setOption}
                            {...sort}
                        />
                    ))}
                </div>

                <div>
                    <h1 className="mb-4 text-xl">Filter by Cuisines</h1>

                    {cuisines.map((cuisine) => (
                        <Filter
                            key={cuisine.id}
                            category={category}
                            setCategory={setCategory}
                            {...cuisine}
                        />
                    ))}
                </div>
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
                            category={category}
                            setCategory={setCategory}
                            option={option}
                            setOption={setOption}
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
                            stores.data.map((store, i) => (
                                <StoreCard key={i} {...store} />
                            ))
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

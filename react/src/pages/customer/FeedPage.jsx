import { useState } from "react";
import { cuisines } from "../../constants/cuisineData";
import { LuSettings2 } from "react-icons/lu";
import Filter from "../../components/customer/FeedPage/Filter";
import Searchbar from "../../components/customer/FeedPage/Searchbar";
import { sortOptions } from "../../constants/sortData";
import StoreCard from "../../components/customer/FeedPage/StoreCard";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavButtons from "../../components/customer/FeedPage/SwiperNavButtons";

import "swiper/css";
import ToggleFiltersMenu from "../../components/customer/MenuPage/ToggleFiltersMenu";

export default function FeedPage() {
    const [option, setOption] = useState("relevant");
    const [category, setCategory] = useState("all");
    const [isToggleOptions, _setIsToggleOptions] = useState(false);

    const setIsToggleOptions = () => {
        _setIsToggleOptions(!isToggleOptions);
        if(isToggleOptions) {
            document.body.classList.add("stop-scrolling");
        } else {
            document.body.classList.remove("stop-scrolling");
        }
    }

    return (
        <div className="flex px-4 md:px-8 pt-16 border-t border-t-gray-200 ">
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
                    <Searchbar />
                    <button
                        type="button"
                        className="block md:hidden flex-auto ml-3"
                        onClick={setIsToggleOptions}
                    >
                        <LuSettings2 size={24} className="text-gray-700" />
                    </button>

                    {
                        isToggleOptions && <ToggleFiltersMenu
                                                sortOptions={sortOptions}
                                                cuisines={cuisines}
                                                Filter={Filter}
                                                category={category}
                                                setCategory={setCategory}
                                                option={option}
                                                setOption={setOption}
                                                setIsToggleOptions={setIsToggleOptions}
                                            />
                    }
                </div>

                <div className="mt-10">
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
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <StoreCard />
                        </SwiperSlide>

                        <SwiperNavButtons />
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

import { useRef, useState } from "react"
import { cuisines } from "../../constants/cuisineData";

import Filter from "../../components/customer/FeedPage/Filter";
import Searchbar from "../../components/customer/FeedPage/Searchbar";
import { sortOptions } from "../../constants/sortData";
import StoreCard from "../../components/customer/FeedPage/StoreCard";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperNavButtons from "../../components/customer/FeedPage/SwiperNavButtons";

import 'swiper/css';

export default function FeedPage() {
    const [option, setOption] = useState("relevant");
    const [category, setCategory] = useState("all");

    return (
        <div className="flex px-8 pt-16 border-t border-t-gray-200 ">
            <div className="w-1/4 sticky top-[100px]
                             shadow-sm h-[550px] overflow-y-scroll">
                <div className="mb-5">
                    <h1 className="mb-4 text-xl">Sort by</h1>

                    {
                        sortOptions.map((sort) => (
                            <Filter key={sort.id}
                                    category={option}
                                    setCategory={setOption}
                                    {...sort}
                            />
                        ))
                    }


                </div>

                <div>
                    <h1 className="mb-4 text-xl">Filter by Cuisines</h1>

                    {
                        cuisines.map((cuisine) => (
                            <Filter key={cuisine.id}
                                    category={category}
                                    setCategory={setCategory}
                                    {...cuisine}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="w-3/4 pl-5">
                <div>
                    <Searchbar />
                </div>

                <div className="mt-10">
                    <h1 className="text-3xl mb-5">Order it again</h1>


                        <Swiper
                                slidesPerView={3}
                                spaceBetween={50}

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
                            </SwiperSlide><SwiperSlide>
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
    )
}

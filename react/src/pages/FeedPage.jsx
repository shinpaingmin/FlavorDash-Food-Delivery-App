import { useState } from "react"
import { cuisines } from "../constants/cuisineData";
import { FaStar } from "react-icons/fa";
import Filter from "../components/FeedPage/Filter";
import Searchbar from "../components/FeedPage/Searchbar";
import { sortOptions } from "../constants/sortData";

import { motion } from 'framer-motion';

export default function FeedPage() {
    const [option, setOption] = useState("relevant");
    const [category, setCategory] = useState("all");

    const [scale, setScale] = useState(false);

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

                    <motion.div className="w-80 h-64 border shadow rounded-md cursor-pointer"
                                onMouseEnter={() => setScale(true)}
                                onMouseLeave={() => setScale(false)}
                    >
                        <div className="w-full h-40 overflow-hidden">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLeIZ8lcZUns6_RvE2_3pLT3hqoXGw8hclg&usqp=CAU" alt="kfc" className={`w-full h-full object-cover object-center rounded-t-md transition-all duration-500 ${scale ? "scale-110" : ""}`} />
                        </div>
                        <div className="p-3">
                            <div className="flex items-center">
                            <h3>KFC (Parami)</h3>
                        <div className="flex">
                        <FaStar color="#ff9529" /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                            </div>
                        </div>
                    </motion.div>



                </div>
            </div>
        </div>
    )
}

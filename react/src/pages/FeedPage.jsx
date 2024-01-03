import { useState } from "react"
import { cuisines } from "../constants/cuisineData";
import { FaStar } from "react-icons/fa";
import Filter from "../components/FeedPage/Filter";
import Searchbar from "../components/FeedPage/Searchbar";

export default function FeedPage() {
    const [category, setCategory] = useState("all");

    return (
        <div className="flex px-8 pt-16 border-t border-t-gray-200 ">
            <div className="w-1/4 sticky top-0
                             shadow-sm h-[550px] overflow-auto">
                {/* <div className="">
                    <h1 className="text-lg">Sort by</h1>
                </div> */}

                <div>
                    <h1 className="mb-4 text-xl">Filter by Cuisines</h1>

                    <Filter category={category}
                            setCategory={setCategory}
                            cuisines={cuisines}
                    />
                </div>
            </div>

            <div className="w-3/4 pl-5">
                <div>
                    <Searchbar />
                </div>

                <div className="mt-10">
                    <h1 className="text-3xl mb-5">Order it again</h1>

                    <div className="w-72 h-64 bg-green-900">
                        <div className="w-full h-40">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLeIZ8lcZUns6_RvE2_3pLT3hqoXGw8hclg&usqp=CAU" alt="kfc" className="w-full h-full object-cover object-center rounded-t-md" />
                        </div>
                        <div className="p-3">
                            <div className="flex items-center">
                            <h3>KFC (Parami)</h3>
                        <div className="flex">
                        <FaStar color="#ff9529" /> <FaStar /> <FaStar /> <FaStar />
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

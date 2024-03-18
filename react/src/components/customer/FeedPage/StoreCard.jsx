import { useState } from "react"

import { FaStar, FaRegClock, FaShippingFast, FaRegHeart } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

const StoreCard = ({
    image,
    name,
    reviews_avg_rating_star,
    reviews_count,
    restaurant_type: {type},
    pricing
}) => {
    const [scale, setScale] = useState(false);
    const navigate = useNavigate();
  return (
    <motion.div className="relative w-full md:w-80 min-h-64 border shadow rounded-md cursor-pointer"
                                onMouseEnter={() => setScale(true)}
                                onMouseLeave={() => setScale(false)}
                onClick={() => navigate("/menu")}
    >
        <div className="absolute top-2 right-2
            w-8 h-8 rounded-full bg-white z-20 grid place-items-center hover:scale-110 transition-all"

        >
                <FaRegHeart className="text-orange" />
        </div>
        <div className="w-full h-40 overflow-hidden">
            <img
                src={`http://localhost:8000/storage/${image}` ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLeIZ8lcZUns6_RvE2_3pLT3hqoXGw8hclg&usqp=CAU"} alt={name}
                className={`w-full h-full object-cover object-center rounded-t-md transition-all duration-500 ${scale ? "scale-110" : ""}`} />
        </div>
        <div className="p-3">
            <div className="flex items-center justify-between">
                <h3>{name}</h3>
                <div className="flex items-center">
                    <FaStar color="#ff9529" />
                    <span className="ml-2">{reviews_avg_rating_star}</span>
                    <span>({reviews_count})</span>
                </div>
            </div>

            <ul className="flex list-disc list-inside my-2">
                <li className="capitalize mr-3 text-sm"><span className="ml-[-10px]">{type}</span></li>
                <li className="capitalize mr-3 text-sm"><span className="ml-[-10px]">{pricing}</span></li>
            </ul>

            <div className="flex items-center">
                <div className="flex items-center text-sm mr-3">
                    <FaRegClock size={15}/>
                    <span className="ml-1">35min</span>
                </div>

                <div className="flex items-center text-sm">
                    <FaShippingFast size={18} />
                    <span className="ml-1">1000 MMK</span>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default StoreCard


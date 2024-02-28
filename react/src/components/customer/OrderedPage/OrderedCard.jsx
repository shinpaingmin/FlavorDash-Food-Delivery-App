import { useState } from "react";
import { FaStar, FaRegClock, FaShippingFast, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import MoreDetailsDropdownMenu from "./MoreDetailsDropdownMenu";

const OrderedCard = ({
    setIsFeedbackModalOpen,
    setIsReorderModalOpen,
    setIsStoreInfoModalOpen,
}) => {
    const [scale, setScale] = useState(false);
    const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);

    return (
        <motion.div
            className="relative w-full md:w-80 min-h-64 border shadow rounded-md cursor-pointer"
            onMouseEnter={() => setScale(true)}
            onMouseLeave={() => setScale(false)}
        >
            <div
                className="absolute top-2 right-2 mr-12
            w-8 h-8 rounded-full bg-white z-20 grid place-items-center hover:scale-110 transition-all"
            >
                <FaRegHeart className="text-orange" />
            </div>
            <div
                className="absolute top-2 right-2 cursor-pointer
            w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"
                onClick={() => setIsMoreDetailsOpen(!isMoreDetailsOpen)}
            >
                <HiOutlineDotsHorizontal className="text-orange" />
            </div>
            <div className="w-full h-40 overflow-hidden">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLeIZ8lcZUns6_RvE2_3pLT3hqoXGw8hclg&usqp=CAU"
                    alt="kfc"
                    className={`w-full h-full object-cover object-center rounded-t-md transition-all duration-500 ${
                        scale ? "scale-110" : ""
                    }`}
                />
            </div>
            {isMoreDetailsOpen && (
                <MoreDetailsDropdownMenu
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                />
            )}
            <div className="p-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-gray-700 font-semibold">KFC (Parami)</h3>
                    <h3 className="text-gray-700 font-semibold">17,000 MMK</h3>
                </div>

                <p className="text-gray-600 font-semibold text-sm my-2">Delivered on Wed, May 13, 2:00 PM</p>
                <p className="text-gray-600 font-semibold text-sm my-2">Order ID: #fd239i2</p>

                <p className="text-gray-600 font-semibold text-sm my-2">4 x Fried chicken (spicy)</p>
                <p className="text-gray-600 font-semibold text-sm my-2">2 x Hamburger</p>
            </div>
        </motion.div>
    );
};

export default OrderedCard;

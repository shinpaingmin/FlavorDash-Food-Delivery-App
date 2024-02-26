import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaInfoCircle } from "react-icons/fa";

const MoreDetailsDropdownMenu = () => {
    return (
        <div className="animate2 bg-white absolute top-2 right-2 mt-10 z-[1] w-40 h-40 px-4 py-1 rounded-md">
            <ul className="flex flex-col justify-evenly h-full">
                <li className="flex items-center">
                    <FaHeart className="text-gray-700" />
                    <Link
                        className="font-semibold ml-2 hover:text-gray-700"
                        to="/"
                    >
                        Order again
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaStar className="text-gray-700" />
                    <button
                        className="font-semibold ml-2 hover:text-gray-700"
                        type="button"
                    >
                        Give feedback
                    </button>
                </li>
                <li className="flex items-center">
                    <FaInfoCircle className="text-gray-700" />
                    <Link
                        className="font-semibold ml-2 hover:text-gray-700"
                        to="/"
                    >
                        Store info
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MoreDetailsDropdownMenu;

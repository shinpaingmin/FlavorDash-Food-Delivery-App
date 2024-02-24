import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaInfoCircle } from "react-icons/fa";

const MoreDetailsDropdown = () => {
    return (
        <div className="animate2 bg-white absolute top-2 right-2 mt-12 z-[1] w-56 h-48 px-4 py-3 rounded-md">
            <ul className="flex flex-col justify-evenly h-full">
                <li className="flex items-center">
                    <FaHeart className="text-gray-700" />
                    <Link
                        className="font-semibold ml-2 hover:text-gray-700"
                        to="/"
                    >
                        Add to favourites
                    </Link>
                </li>
                <li className="flex items-center">
                    <FaStar className="text-gray-700" />
                    <Link
                        className="font-semibold ml-2 hover:text-gray-700"
                        to="/"
                    >
                        Give feedback
                    </Link>
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

export default MoreDetailsDropdown;

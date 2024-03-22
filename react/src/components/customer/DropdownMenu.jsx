import { Link } from "react-router-dom"
import { CiReceipt } from "react-icons/ci";
import { RiLogoutBoxRLine } from "react-icons/ri";

const DropdownMenu = ({ logout }) => {
  return (
    <div className="animate2 bg-white shadow-md absolute top-2 right-0 mt-6 z-[10] w-56 h-32 rounded-md">
        <ul className="flex flex-col justify-evenly h-full">
            <li className="flex items-center hover:bg-gray-100 p-3">
                <CiReceipt className="text-gray-700" size={22} />
                <Link
                    className="font-semibold ml-2 hover:text-gray-700"
                    to="/ordered/items"
                >
                    Order & reordering
                </Link>
            </li>
            <li className="flex items-center hover:bg-gray-100 p-3">
                <RiLogoutBoxRLine className="text-gray-700" size={20} />
                <button
                    className="font-semibold ml-2 hover:text-gray-700"
                    onClick={logout}
                    type="button"
                >
                    Logout
                </button>
            </li>
            {/* <li className="flex items-center">
                <FaInfoCircle className="text-gray-700" />
                <Link
                    className="font-semibold ml-2 hover:text-gray-700"
                    to="/"
                >
                    Store info
                </Link>
            </li> */}
        </ul>
    </div>
  )
}

export default DropdownMenu

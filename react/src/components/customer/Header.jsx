import { Link, Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaUser, FaPlus, FaRegUser, FaRegHeart, FaGlobe } from "react-icons/fa";
import { FaTruckFast, FaLocationDot } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";
import HamburgerMenu from "./HamburgerMenu";
import { useRef, useState } from "react";
import ShoppingCart from "./ShoppingCart";
import DropdownMenu from "./DropdownMenu";
import {
    useGetRestaurantTownshipsQuery,
    useLogoutMutation,
} from "../../services";

const Header = ({ open, setOpen }) => {
    const [scroll, _setScroll] = useState(false);
    const [loggedIn] = useState(localStorage.getItem("token"));
    const [openCart, setOpenCart] = useState(false);
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const menuDropdown = useRef();
    const [queryParameters, setQueryParameters] = useSearchParams();
    const { data: townships = [], isLoading } =
        useGetRestaurantTownshipsQuery();
    const [selectedTownship, setSelectedTownship] = useState(
        queryParameters.get("searchTownship") ||
            localStorage.getItem("searchTownship")
    );
    const [logout, { isSuccess }] = useLogoutMutation();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    if (isSuccess) {
        localStorage.clear();
        return <Navigate to="/login" />;
    }



    function onChangeHandle(inputValue) {
        setSelectedTownship(inputValue);
        if(pathname !== "/feed") {
            navigate(`/feed?searchTownship=${inputValue}`)
        } else {
            setQueryParameters({
                searchTownship: inputValue,
            });
        }

    }

    const setScroll = () => {
        window.scrollY > 0 ? _setScroll(true) : _setScroll(false);
    };

    window.addEventListener("scroll", setScroll);

    // dropdown close
    window.addEventListener("click", function (e) {
        if (isDropdownMenuOpen) {
            if (!menuDropdown?.current?.contains(e.target)) {
                setIsDropdownMenuOpen(false);
            }
        }
    });

    const handleOpenCart = () => {
        if (!openCart) {
            setOpenCart(true);
            document.body.classList.add("stop-scrolling");
        } else {
            setOpenCart(false);
            document.body.classList.remove("stop-scrolling");
        }
    };

    return (
        <>
            <header
                className={`flex justify-between items-center px-2 md:px-8 py-5 h-[76px] sticky top-0 left-0 w-full z-[99]
                             ${scroll && " bg-white border-gray-200 shadow"}`}
            >
                <Link className="flex items-center" to="/">
                    <FaTruckFast
                        size={40}
                        className="text-orange mr-2 md:mr-4"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-orange">
                            FlavorDash
                        </h1>
                        <small className="md:uppercase text-orange">
                            Delicious bites, deliver right!
                        </small>
                    </div>
                </Link>
                {loggedIn && (
                    <div className="flex items-center mx-auto">
                        <FaLocationDot size={22} className="text-orange" />
                        {
                            <select
                                onChange={(e) =>
                                    onChangeHandle(e.target.value)
                                }
                                value={selectedTownship}
                                className="border-none focus:border-none focus:outline-none cursor-pointer"
                            >
                                <option value="" selected disabled>
                                    {isLoading
                                        ? "Loading..."
                                        : "Please select your township"}
                                </option>
                                {townships ? (
                                    townships?.data?.map((township) => (
                                        <option
                                            key={township.id}
                                            className="ml-2 capitalize"
                                            value={township.township}
                                        >
                                            {township.township}, Yangon
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No available townships
                                    </option>
                                )}
                            </select>
                        }
                    </div>
                )}
                {loggedIn ? (
                    <ul className="hidden lg:flex items-center list-none">
                        <li
                            ref={menuDropdown}
                            className="flex items-center relative cursor-pointer"
                            onClick={() =>
                                setIsDropdownMenuOpen(!isDropdownMenuOpen)
                            }
                        >
                            <FaRegUser />
                            <p className="ml-2 capitalize">
                                {localStorage.getItem("name")}
                            </p>
                            <button type="button">
                                <IoIosArrowDown />
                            </button>
                            {isDropdownMenuOpen && (
                                <DropdownMenu logout={logout} />
                            )}
                        </li>
                        <li className="ml-8 flex items-center">
                            <FaGlobe size={20} className="" />
                            <p className="ml-2">Eng</p>
                        </li>
                        <li className="ml-12">
                            <FaRegHeart size={20} className="text-orange" />
                        </li>
                        <li
                            className="ml-5 rounded-full p-2 cursor-pointer duration-300 hover:bg-[#ffd7b5]"
                            onClick={handleOpenCart}
                        >
                            <IoCartOutline size={24} className="text-orange" />
                        </li>
                    </ul>
                ) : (
                    <ul className="hidden lg:flex list-none">
                        <li className="">
                            <Button
                                bgColor="bg-orange"
                                textColor="text-white"
                                border="border-none"
                                href="/login"
                            >
                                <FaUser className="mr-2" /> Log in
                            </Button>
                        </li>
                        <li className="ml-5">
                            <Button
                                bgColor="bg-white"
                                textColor="text-orange"
                                border="border"
                                href="/signup"
                            >
                                <FaPlus className="mr-2" /> Sign up
                            </Button>
                        </li>
                    </ul>
                )}
            </header>

            <HamburgerMenu open={open} setOpen={setOpen} />

            <div className={`${open ? "overlay-show" : ""}`}></div>

            {/* mobile menu  */}

            <div className={`mobile-main-menu ${open && "show"}`}>
                <ul>
                    <li>
                        <Link>Add your restaurant</Link>
                    </li>

                    <li>
                        <Link>Sign up to deliver</Link>
                    </li>

                    <li>
                        <Button bgColor="bg-black" border="border-none">
                            <FaUser className="mr-2 text-white" />{" "}
                            <span className="text-white">Log in</span>
                        </Button>
                    </li>
                    <li>
                        <Button bgColor="bg-white" border="border-none">
                            <FaPlus className="mr-2 text-black" />{" "}
                            <span className="text-black">Sign up</span>
                        </Button>
                    </li>
                </ul>
            </div>

            {openCart && <ShoppingCart handleOpenCart={handleOpenCart} />}
        </>
    );
};

export default Header;

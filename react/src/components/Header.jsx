import { Link } from 'react-router-dom';
import { FaUser, FaPlus, FaRegUser, FaRegHeart, FaGlobe } from "react-icons/fa";
import { FaTruckFast, FaLocationDot  } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import Button from "./Button";
import HamburgerMenu from './HamburgerMenu';
import { useState } from 'react';

const Header = ({ open, setOpen }) => {

    const [scroll, _setScroll] = useState(false);
    const [loggedIn ,setLoggedIn] = useState(true);

    const setScroll = () => {
        window.scrollY > 0 ? _setScroll(true) : _setScroll(false);
    }

    window.addEventListener("scroll", setScroll);

    return (
        <>
        <header className={`flex justify-between items-center px-2 md:px-8 py-5 h-[76px] sticky top-0 left-0 w-full z-10
                             ${scroll && " bg-white border-gray-200 shadow"}`}>
            <Link className='flex items-center' to="/">
                <FaTruckFast size={40} className='text-orange mr-2 md:mr-4' />
                <div>
                    <h1 className='text-xl md:text-2xl font-bold text-orange'>FlavorDash</h1>
                    <small className='max-md:text-xs md:uppercase text-orange'>Delicious bites, deliver right!</small>
                </div>
            </Link>
            {
                loggedIn && <div className='flex items-center'>
                    <FaLocationDot size={22} className='text-orange' />
                    <p className='ml-2'>Hlaing, Yangon</p>
                </div>
            }
            {
                loggedIn ? (
                    <ul className='hidden md:flex items-center list-none'>
                        <li className='flex items-center'>
                            <FaRegUser />
                            <p className='ml-2'>Shin Paing Min</p>
                        </li>
                        <li className='ml-8 flex items-center'>
                            <FaGlobe size={20} className='' />
                            <p className='ml-2'>Eng</p>
                        </li>
                        <li className='ml-12'>
                            <FaRegHeart size={20} className='text-orange' />
                        </li>
                        <li className='ml-5'>
                            <IoCartOutline size={24} className='text-orange' />
                        </li>
                    </ul>
                ) : (
                    <ul className='hidden md:flex list-none'>
                        <li className=''>
                            <Button bgColor="bg-orange" textColor="text-white" border="border-none" to="/login">
                                <FaUser className='mr-2' /> Log in
                            </Button>
                        </li>
                        <li className='ml-5'>
                            <Button bgColor="bg-white" textColor="text-orange" border="border" to="/signup">
                                <FaPlus className='mr-2' /> Sign up
                            </Button>
                        </li>
                    </ul>
                )
            }




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
                        <FaUser className='mr-2 text-white' /> <span className='text-white'>Log in</span>
                    </Button>
                </li>
                <li>
                    <Button bgColor="bg-white" border="border-none">
                        <FaPlus className='mr-2 text-black' /> <span className='text-black'>Sign up</span>
                    </Button>
                </li>
            </ul>
        </div>
        </>
    )
}

export default Header

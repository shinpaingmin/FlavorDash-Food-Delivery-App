import { Link } from 'react-router-dom';
import { FaUser, FaPlus } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import Button from "./Button";
import HamburgerMenu from './HamburgerMenu';
import { useState } from 'react';

const Header = ({ open, setOpen }) => {

    const [scroll, _setScroll] = useState(false);

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
            <ul className='hidden md:flex list-none'>
                <li className=''>
                    <Button bgColor="bg-orange" textColor="text-white" border="border-none" to="login">
                        <FaUser className='mr-2' /> Log in
                    </Button>
                </li>
                <li className='ml-5'>
                    <Button bgColor="bg-white" textColor="text-orange" border="border" to="signup">
                        <FaPlus className='mr-2' /> Sign up
                    </Button>
                </li>
            </ul>



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

import { Link } from 'react-router-dom';
import { FaUser, FaPlus, FaRegUser, FaRegHeart, FaGlobe } from "react-icons/fa";
import { FaTruckFast, FaLocationDot  } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import Button from "./Button";
import HamburgerMenu from './HamburgerMenu';
import { useEffect, useState } from 'react';

const Header = ({ open, setOpen }) => {

    const [scroll, _setScroll] = useState(false);
    const [loggedIn ,setLoggedIn] = useState(true);
    const [openCart, setOpenCart] = useState(false);

    const setScroll = () => {
        window.scrollY > 0 ? _setScroll(true) : _setScroll(false);
    }

    window.addEventListener("scroll", setScroll);

    const handleOpenCart = () => {
        if(!openCart) {
            setOpenCart(true);
            // document.body.classList.add('stop-scrolling');
        } else {
            setOpenCart(false);
            // document.body.classList.remove('stop-scrolling');
        }
    }




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
                        <li className='ml-5 rounded-full p-2 cursor-pointer duration-300 hover:bg-[#ffd7b5]'
                            onClick={handleOpenCart}>
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

        {
            openCart && <div className='fixed top-0 left-0 w-full h-full z-10
            bg-black/50 flex items-center justify-center'>
           <div className='animate w-[500px] h-[450px] bg-[#fefefe] relative overflow-auto hideScrollbar px-6 py-4'>

                <h1 className='font-bold text-2xl '>Cart</h1>
                <span className='font-bold text-3xl cursor-pointer absolute top-2.5 right-5'
                    onClick={handleOpenCart}>&times;</span>

                <div className='border-t border-t-gray-300 border-dotted mb-3'>
                    <div className='mt-3 flex border shadow-sm'>
                        <div className='w-32 h-24'>
                            <img src="https://geekrobocook.com/wp-content/uploads/2021/04/KFC-Chicken-fry.jpg" alt="" className='w-full h-full object-cover bg-gray-500' />
                        </div>
                        <div className='p-2.5'>
                            <h3 className='text-sm font-bold mb-3'>KFC chicken</h3>
                            <div className='flex items-center'>
                                <button className='rounded-full p-1 w-6 h-6 border flex items-center justify-center'>+</button>
                                <p className='mx-3'>12</p>
                                <button className='rounded-full p-1 w-6 h-6 border flex items-center justify-center'>-</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 flex border shadow-sm'>
                        <div className='w-32 h-24'>
                            <img src="https://cicili.tv/wp-content/uploads/2020/09/Ma-la-xiang-guo-3-scaled.jpg" alt="" className='w-full h-full object-cover bg-gray-500' />
                        </div>
                        <div className='p-2.5'>
                            <h3 className='text-sm font-bold'>Mala xiang gou</h3>
                        </div>
                    </div>
                    <div className='mt-3 flex border shadow-sm'>
                        <div className='w-32 h-24'>
                            <img src="https://en.ardeche-guide.com/sites/default/files/sit/data/media/images/134244/boulieu_pizz-7728144.jpg" alt="" className='w-full h-full object-cover bg-gray-500' />
                        </div>
                        <div className='p-2.5'>
                            <h3 className='text-sm font-bold'>Pizza</h3>
                        </div>
                    </div>
                    <div className='mt-3 flex border shadow-sm'>
                        <div className='w-32 h-24'>
                            <img src="https://sudachirecipes.com/wp-content/uploads/2023/07/kimchi-nabe-thumb-500x500.jpg" alt="" className='w-full h-full object-cover bg-gray-500' />
                        </div>
                        <div className='p-2.5'>
                            <h3 className='text-sm font-bold'>Hotpot</h3>
                        </div>
                    </div>
                </div>

                <div className='border-t border-t-gray-300 border-dashed'>
                    <div className='mt-3 flex justify-between items-center'>
                        <h2 className='font-bold'>Total: $400</h2>
                        <button className='px-4 py-2 bg-orange text-white hover:opacity-90'>
                            Checkout
                        </button>
                    </div>
                </div>
           </div>
       </div>
        }
        </>
    )
}

export default Header

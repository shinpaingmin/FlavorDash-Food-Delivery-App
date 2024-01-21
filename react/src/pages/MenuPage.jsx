import { Link } from 'react-scroll';
import { FaRegHeart, FaStar, FaShippingFast, FaClock, FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";

const MenuPage = () => {
  return (
    <div className="flex flex-initial justify-between px-8 pt-8 border-t border-t-gray-200">
        <div className="w-3/4 mr-4">
            <div className="w-full h-80 mb-4 relative">
                <img src="https://kfc.com.mm/wp-content/uploads/2023/06/Brand-Focus_5_Update.jpg"
                    alt="hero image"
                    className="w-full h-full object-cover object-center rounded-md bg-gray-300" />
                <div className="absolute top-2 right-2 mr-12 cursor-pointer
                    w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

                >
                        <FaRegHeart className="text-orange" />
                </div>
                <div className="absolute top-2 right-2 cursor-pointer
                    w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

                >
                        <HiOutlineDotsHorizontal className="text-orange" />
                </div>
            </div>
            <div className="flex items-center mb-3">
                <h1 className="text-2xl font-bold mr-4">KFC Myanmar</h1>
                <div className="flex items-center">
                    <FaStar color="#ff9529" size={22} className="mr-1" />
                    <FaStar color="#ff9529" size={22} className="mr-1" />
                    <FaStar color="#ff9529" size={22} className="mr-1" />
                    <FaStar color="#ff9529" size={22} className="mr-1" />
                </div>
                <div>(200+)</div>
            </div>
            <div className="flex items-center mb-3">
                <FaClock />
                <p className="mr-3 ml-1">40 mins</p>
                <FaLocationDot />
                <p className="ml-1 mr-3">4 kms</p>
                <FaShippingFast />
                <p className="ml-1">1000MMK</p>
            </div>

            <div className="flex items-center py-4 sticky top-[76px] z-[2] bg-white mb-8">

                <div className="flex w-64 h-12 mr-12 bg-white items-center
                            rounded-md border border-slate-300 md:p-2 max-md:mb-14
                            focus-within:border-black">
                    <input type="text" className="px-2 text-sm border-none focus:outline-none focus:ring-0 flex-1"
                        placeholder="Search for your favourite in menu" />
                </div>

                <div className='overflow-x-auto flex items-center hideScrollbar'>
                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="popular"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Popular
                    </Link>


                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="burger"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Burger
                    </Link>


                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="chicken"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Chicken
                    </Link>


                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>

                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>

                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>

                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>

                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>
                    <Link
                    className='font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer'
                    activeClass='active'
                    to="drink"
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-100}>
                        Drink
                    </Link>

                </div>

            </div>

            <div className=' mb-3' id='popular'>
                <h1 className='mb-4 text-2xl font-bold'>Popular Now</h1>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='hover:shadow-lg'>
                        <div className='w-80 h-48 overflow-hidden relative'>
                            <img src="https://content.jdmagicbox.com/comp/navi-mumbai/m3/022pxx22.xx22.210907121530.r8m3/catalogue/kfc-airoli-sector-6-navi-mumbai-kfc-dfq5als5zn.jpg" alt="kfc"
                            className='w-full h-full object-cover object-center rounded-md' />
                            <div className="absolute top-2 right-2  cursor-pointer
                                w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

                            >
                                    <FaShoppingCart className="text-orange" />
                            </div>
                        </div>
                        <h2 className='mt-2 font-semibold'>Spicy chicken set-A</h2>
                        <p className='text-gray-700 font-semibold text-sm mt-2'>MMK 2000</p>
                    </div>
                    <div className='hover:shadow-lg'>
                        <div className='w-80 h-48 overflow-hidden relative'>
                            <img src="https://content.jdmagicbox.com/comp/navi-mumbai/m3/022pxx22.xx22.210907121530.r8m3/catalogue/kfc-airoli-sector-6-navi-mumbai-kfc-dfq5als5zn.jpg" alt="kfc"
                            className='w-full h-full object-cover object-center rounded-md' />
                            <div className="absolute top-2 right-2  cursor-pointer
                                w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

                            >
                                    <FaShoppingCart className="text-orange" />
                            </div>
                        </div>
                        <h2 className='mt-2 font-semibold'>Spicy chicken set-B</h2>
                        <p className='text-gray-700 font-semibold text-sm mt-2'>MMK 2000</p>
                    </div>
                    <div className='hover:shadow-lg bg-red-800'>
                        <div className='w-80 h-48 overflow-hidden relative'>
                            <img src="https://content.jdmagicbox.com/comp/navi-mumbai/m3/022pxx22.xx22.210907121530.r8m3/catalogue/kfc-airoli-sector-6-navi-mumbai-kfc-dfq5als5zn.jpg" alt="kfc"
                            className='w-full h-full object-cover object-center rounded-md' />
                            <div className="absolute top-2 right-2  cursor-pointer
                                w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

                            >
                                    <FaShoppingCart className="text-orange" />
                            </div>
                        </div>
                        <h2 className='mt-2 font-semibold'>Spicy chicken set-C</h2>
                        <p className='text-gray-700 font-semibold text-sm mt-2'>MMK 2000</p>
                    </div>
                </div>
            </div>

            <div className='w-full h-40 bg-red-400 mb-3' id="burger"> </div>
            <div className='w-full h-40 bg-gray-400 mb-3' id='chicken'> </div>
            <div className='w-full h-40 bg-blue-400' id='drink' > </div>
        </div>
        <div className="w-1/4 border border-slate-300
            min-h-96 self-start rounded-md sticky top-[80px] p-4">
                <h1 className="text-xl font-bold">My Orders</h1>
                <div className="mt-5">
                    <p className="text-sm mb-2 font-bold text-gray-700">Delivery address</p>
                    <h1 className="text-lg font-bold mb-2 text-gray-700">1341 Marris Street</h1>
                    <div className="flex items-center">
                        <CiClock2 className="mr-1" />
                        <p className="text-sm mr-3">40 mins</p>
                        <CiLocationOn className="mr-1" />
                        <p className="text-sm">4 kms</p>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default MenuPage

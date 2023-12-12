import { Link } from 'react-router-dom';
import { FaUser, FaPlus } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import Button from "./Button";
import HamburgerMenu from './HamburgerMenu';

const Header = ({ open, setOpen }) => {

  return (
    <header className="flex justify-between items-center px-2 md:px-8 py-5 h-[76px]">
        <Link className='flex items-center' to="/">
            <FaTruckFast size={40} className='text-orange mr-2 md:mr-4' />
            <div>
                <h1 className='text-xl md:text-2xl font-bold text-orange'>FlavorDash</h1>
                <small className='max-md:text-xs md:uppercase text-orange'>Delicious bites, deliver right!</small>
            </div>
        </Link>
        <ul className='hidden md:flex list-none'>
            <li className=''>
                <Button bgColor="bg-orange" textColor="text-white" border="border-none">
                    <FaUser className='mr-2' /> Log in
                </Button>
            </li>
            <li className='ml-5'>
                <Button bgColor="bg-white" textColor="text-orange" border="border-none">
                    <FaPlus className='mr-2' /> Sign up
                </Button>
            </li>
        </ul>

        <HamburgerMenu open={open} setOpen={setOpen} />

        <div className={`hidden ${open && "overlay-show"}`}></div>

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

    </header>
  )
}

export default Header

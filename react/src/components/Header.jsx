import { Link } from 'react-router-dom';
import { FaUser, FaPlus } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import Button from "./Button";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-5 h-[76px]">
        <Link className='flex items-center' to="/">
            <FaTruckFast size={40} className='text-orange mr-4' />
            <div>
                <h1 className='text-2xl font-bold text-orange'>FlavorDash</h1>
                <small className='uppercase text-orange'>Delicious bites, deliver right!</small>
            </div>
        </Link>
        <ul className='flex list-unstyled'>
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
    </header>
  )
}

export default Header

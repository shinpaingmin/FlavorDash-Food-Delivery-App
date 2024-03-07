import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { GoKey } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SocialMedia from "../../components/customer/SocialMedia";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";

const SignUpPage = () => {
  return (
    <div className="px-8 pt-12 border-t border-t-gray-200 ">
        <h1 className="font-bold text-3xl text-center mb-8">Sign Up</h1>
        <div className="max-w-[500px] min-h-[750px] m-auto  border border-gray-300 py-6 px-8 rounded-md">

            <form action="" className="mb-5">
                <div className="mb-5">
                    <label htmlFor="email">Username</label>
                    <div className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black">

                        <FaRegUser className="text-gray-500 mr-2 focus:text-black" />
                        <input type="text" className="flex-1 focus:outline-none" id="email"
                            placeholder="Enter your username" />
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="email">Email address</label>
                    <div className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black">

                        <MdAlternateEmail className="text-gray-500 mr-2 focus:text-black" />
                        <input type="text" className="flex-1 focus:outline-none" id="email"
                            placeholder="Enter your email address" />
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="password">Password</label>
                    <div className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black">

                        <GoKey className="text-gray-500 mr-2 focus:text-black" />
                        <input type="password" className="flex-1 focus:outline-none" id="password"
                            placeholder="Enter your password" />
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="password">Confirm password</label>
                    <div className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black">

                        <IoShieldCheckmark className="text-gray-500 mr-2 focus:text-black" />
                        <input type="password" className="flex-1 focus:outline-none" id="password"
                            placeholder="Confirm your password" />
                    </div>
                </div>

                <div className="px-6 mb-5 text-sm text-center">
                    <p>
                        By signing up, you accept our <Link className="underline">Terms of Service</Link> and <Link className="underline">Privacy Policy</Link>
                    </p>
                </div>

                <button className="w-full bg-orange text-white py-3 text-center rounded-md hover:opacity-90">Sign up</button>
            </form>

            <p className="text-center text-sm mb-5">
                Already existing an account? <Link to='/login' className="underline">Login</Link>
            </p>

            <div className="mb-5 flex items-center justify-between">
                <div className="h-[1px] w-1/3 bg-slate-300"></div>
                <p className="text-sm">Sign up with</p>
                <div className="h-[1px] w-1/3 bg-slate-300"></div>
            </div>

            <div className="flex items-center w-max m-auto">
                <div className="cursor-pointer mr-3">
                    <SocialMedia Icon={FaGoogle} size={24} color="text-black" bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl" padding="p-3" />
                </div>
                <div className="cursor-pointer mr-3">
                    <SocialMedia Icon={FaFacebookF} size={24} color="text-black" bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl" padding="p-3" />
                </div>
                <div className="cursor-pointer">
                    <SocialMedia Icon={FaGithub} size={24} color="text-black" bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl" padding="p-3" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUpPage

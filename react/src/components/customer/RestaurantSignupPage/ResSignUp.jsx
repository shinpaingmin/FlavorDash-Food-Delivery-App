import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

const ResSignUp = (props) => {
    const [isValidState, setIsValidState] = useState(false);

    const signalParent = (isValid) => {
        setIsValidState(isValid);
        props.signalIfValid(isValid);
    };

    useEffect(() => {
        signalParent(isValidState);
    }, []);

    return (
        <div className="w-full">
            <h1 className="font-bold text-3xl text-center mb-8">Sign Up</h1>
            <div className="max-sm:w-full w-[500px]   m-auto  border border-gray-300 py-6 px-8 rounded-md">
                <form action="" className="mb-5 w-full">
                    <div className="mb-5 w-full">
                        <label htmlFor="email">Username</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black w-full"
                        >
                            <FaRegUser className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="text"
                                className="w-full flex-1 focus:outline-none"
                                id="email"
                                placeholder="Enter your username"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email">Email address</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <MdAlternateEmail className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="text"
                                className="flex-1 focus:outline-none"
                                id="email"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password">Password</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <GoKey className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="password"
                                className="flex-1 focus:outline-none"
                                id="password"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password">Confirm password</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <IoShieldCheckmark className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="password"
                                className="flex-1 focus:outline-none"
                                id="password"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResSignUp;

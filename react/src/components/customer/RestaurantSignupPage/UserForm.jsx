import { FaRegUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

const UserForm = ({
    username,
    email,
    password,
    password_confirmation,
    updateFields,
    storeError,
}) => {
    return (
        <div>
            <h1 className="font-bold text-3xl text-center">User form</h1>
            {storeError?.status == "422" && (
                <div className="font-semibold text-center text-red-500 mt-3">
                    Validation Error! Please check all of your input fields
                    again.
                </div>
            )}
            <div className="max-sm:w-full w-[500px]   m-auto  border border-gray-300 py-6 px-8 rounded-md mt-8">
                <div className="mb-5 w-full">
                    <div className="mb-5 w-full">
                        <label htmlFor="username">Username</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black w-full"
                        >
                            <FaRegUser className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="text"
                                name="username"
                                className="w-full flex-1 focus:outline-none"
                                id="username"
                                placeholder="Enter your username"
                                autoFocus
                                required
                                value={username}
                                onChange={(e) =>
                                    updateFields({ username: e.target.value })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.username && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.username}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email">Email address</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <MdAlternateEmail className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="email"
                                name="email"
                                className="flex-1 focus:outline-none"
                                id="email"
                                placeholder="Enter your email address"
                                required
                                value={email}
                                onChange={(e) =>
                                    updateFields({ email: e.target.value })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.email && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.email}</div>
                        )}
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
                                name="password"
                                className="flex-1 focus:outline-none"
                                id="password"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) =>
                                    updateFields({ password: e.target.value })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.password && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.password}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password_confirmation">
                            Confirm password
                        </label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <IoShieldCheckmark className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="password"
                                name="password_confirmation"
                                className="flex-1 focus:outline-none"
                                id="password_confirmation"
                                placeholder="Confirm your password"
                                required
                                value={password_confirmation}
                                onChange={(e) =>
                                    updateFields({
                                        password_confirmation: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.password_confirmation && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.password_confirmation}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserForm;

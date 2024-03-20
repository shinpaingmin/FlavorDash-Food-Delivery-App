import { FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { IoShieldCheckmark } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SocialMedia from "../../components/customer/SocialMedia";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAddUserMutation } from "../../services";
import toast, { Toaster } from 'react-hot-toast';

const INIT_DATA = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};

const SignUpPage = () => {
    const [data, setData] = useState(INIT_DATA);
    const [addUser, { data: resData, isSuccess, isError, error }] = useAddUserMutation();
    const navigate = useNavigate();

    const updateFields = (fields) => {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if(confirm("Are you sure to create a user account?")) {
            const formData = new FormData();

            for(const prop in data) {
                formData.append(`${prop}`, data[prop]);
            }

            addUser(formData);
        }
    }

    useEffect(() => {
        if(isError) {
            toast.error(error?.data?.message || error?.status, {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#fecaca",
                }
            })
        } else if(isSuccess) {
            // setData(INIT_DATA); // clear input fields

            localStorage.setItem("token", resData?.data?.token);    // store token in local storage

            for(const prop in resData?.data?.user) {
                if(resData.data.user[prop]) {
                    localStorage.setItem(`${prop}`, resData.data.user[prop]);
                }
            }

            navigate('/feed?status=signUp');

        }
    }, [isError, isSuccess]);

    return (
        <div className="px-8 pt-12 border-t border-t-gray-200 ">
             <Toaster />

            <h1 className="font-bold text-3xl text-center">Sign Up</h1>

            {error?.status == "422" && (
                <div className="font-semibold text-center text-red-500 mt-3">
                    Validation Error! Please check all of your input fields
                    again.
                </div>
            )}
            <div className="max-w-[500px] min-h-[750px] m-auto  border border-gray-300 py-6 px-8 rounded-md mt-8">
                <form onSubmit={onSubmit} className="mb-5">
                    <div className="mb-5">
                        <label htmlFor="username">Username</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <FaRegUser className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="text"
                                className="flex-1 focus:outline-none"
                                id="username"
                                required
                                autoFocus
                                placeholder="Enter your username"
                                value={data.name}
                                onChange={(e) =>
                                    updateFields({ name: e.target.value })
                                }
                            />
                        </div>
                        {error?.data?.data?.name && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{error?.data?.data?.name}</div>
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
                                className="flex-1 focus:outline-none"
                                id="email"
                                required
                                placeholder="Enter your email address"
                                value={data.email}
                                onChange={(e) =>
                                    updateFields({ email: e.target.value })
                                }
                            />
                        </div>
                        {error?.data?.data?.email && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{error?.data?.data?.email}</div>
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
                                className="flex-1 focus:outline-none"
                                id="password"
                                required
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) =>
                                    updateFields({ password: e.target.value })
                                }
                            />
                        </div>
                        {error?.data?.data?.password && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{error?.data?.data?.password}</div>
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
                                className="flex-1 focus:outline-none"
                                id="password_confirmation"
                                required
                                placeholder="Confirm your password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    updateFields({
                                        password_confirmation: e.target.value,
                                    })
                                }
                            />
                        </div>
                        {error?.data?.data?.password_confirmation && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{error?.data?.data?.username}</div>
                        )}
                    </div>

                    <div className="px-6 mb-5 text-sm text-center">
                        <p>
                            By signing up, you accept our{" "}
                            <Link className="underline">Terms of Service</Link>{" "}
                            and{" "}
                            <Link className="underline">Privacy Policy</Link>
                        </p>
                    </div>

                    <button type="submit" className="w-full bg-orange text-white py-3 text-center rounded-md hover:opacity-90">
                        Sign up
                    </button>
                </form>

                <p className="text-center text-sm mb-5">
                    Already existing an account?{" "}
                    <Link to="/login" className="underline">
                        Login
                    </Link>
                </p>

                <div className="mb-5 flex items-center justify-between">
                    <div className="h-[1px] w-1/3 bg-slate-300"></div>
                    <p className="text-sm">Sign up with</p>
                    <div className="h-[1px] w-1/3 bg-slate-300"></div>
                </div>

                <div className="flex items-center w-max m-auto">
                    <div className="cursor-pointer mr-3">
                        <SocialMedia
                            Icon={FaGoogle}
                            size={24}
                            color="text-black"
                            bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl"
                            padding="p-3"
                        />
                    </div>
                    <div className="cursor-pointer mr-3">
                        <SocialMedia
                            Icon={FaFacebookF}
                            size={24}
                            color="text-black"
                            bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl"
                            padding="p-3"
                        />
                    </div>
                    <div className="cursor-pointer">
                        <SocialMedia
                            Icon={FaGithub}
                            size={24}
                            color="text-black"
                            bgColor="bg-white w-max border-2
                         shadow-sm hover:shadow-xl"
                            padding="p-3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

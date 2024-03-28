import { FaPhoneAlt } from "react-icons/fa";

import { useEffect, useState } from "react";
import {
    useGetUserDetailsQuery,
    useUpdateUserDetailMutation,
} from "../../services";
import toast, { Toaster } from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const INFO_INIT_DATA = {
    // user_id
    address: "",
    phone: "",
    detailed_address: "",
};

const UserDetailsPage = () => {
    const [infoData, setInfoData] = useState(INFO_INIT_DATA);
    const [updateUserDetail, { isSuccess, isError, error }] =
        useUpdateUserDetailMutation();
    const { data: oldUserDetailsData } = useGetUserDetailsQuery();
    const [queryParams] = useSearchParams();

    const successToastMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });

    }
    const errorToastMessage = (message) => {
        toast.error(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#fecaca",
            },
        });

    }

    useEffect(() => {
        if(oldUserDetailsData?.data) {
            setInfoData(prev => ({
                ...prev,
                address: oldUserDetailsData.data.address,
                phone: oldUserDetailsData.data.phone,
                detailed_address: oldUserDetailsData.data.detailed_address,
            }))
        }
    }, [oldUserDetailsData])

    useEffect(() => {
        if(isError) {
            errorToastMessage(error?.data?.message || error?.status);
        } else if(isSuccess) {
            successToastMessage("Updated user details successfully!");
        }
    }, [isError, isSuccess])

    const InfoSubmit = (e) => {
        e.preventDefault();

        if (confirm("Are you sure to update the user information")) {
            updateUserDetail(infoData);
        }
    };

    const updateInfoFields = (fields) => {
        setInfoData((prev) => {
            return { ...prev, ...fields };
        });
    };

    function goBack() {
        if (queryParams.get("goback")) {
            return queryParams.get("goback");
        } else {
            return "/feed"
        }
    }

    return (
        <div className="px-8 pt-12 border-t border-t-gray-200 ">
            <Toaster />
            <div className="max-w-[500px] mx-auto">
                <Link to={goBack()} className="flex mb-6 items-center w-max ">
                    <IoIosArrowBack />
                    Back
                </Link>
            </div>
            <h1 className="font-bold text-3xl text-center">User Details</h1>

            <div className="font-semibold text-center text-red-500 mt-3">
                {error?.status == "422" && "Validation Error!"}
            </div>

            <div className="max-w-[500px] min-h-[500px] m-auto border border-gray-300 py-6 px-8 rounded-md mt-8">
                <form onSubmit={InfoSubmit} className="mb-5">
                    <div className="mb-5">
                        <label htmlFor="phone">Phone number (*)</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <FaPhoneAlt className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="tel"
                                className="flex-1 focus:outline-none"
                                id="phone"
                                placeholder="e.g. 09xxxxxxxxx"
                                required
                                autoFocus
                                value={infoData.phone}
                                onChange={(e) =>
                                    updateInfoFields({ phone: e.target.value })
                                }
                            />
                        </div>
                        {error?.data?.data?.phone && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {error?.data?.data?.phone}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="address">Address (*)</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >

                            <textarea
                                id="address"
                                placeholder="Enter your address"
                                cols="30"
                                rows="7"
                                className="flex-1 focus:outline-none"
                                required
                                value={infoData.address}
                                onChange={(e) =>
                                    updateInfoFields({ address: e.target.value })
                                }
                            ></textarea>

                        </div>
                        {error?.data?.data?.address && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {error?.data?.data?.address}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="detailed_address">Detailed address (optional)</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >

                            <textarea
                                id="detailed_address"
                                placeholder="More details about your address (eg. which floor, nearest places, etc.)"
                                cols="30"
                                rows="7"
                                className="flex-1 focus:outline-none"
                                value={infoData.detailed_address}
                                onChange={(e) =>
                                    updateInfoFields({ detailed_address: e.target.value })
                                }
                            ></textarea>

                        </div>
                        {error?.data?.data?.detailed_address && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {error?.data?.data?.detailed_address}
                            </div>
                        )}
                    </div>

                    <button type="submit"
                        className="bg-orange text-white hover:bg-orange/90 py-3 px-4 w-full rounded-md mt-2"
                    >
                        Save details
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetailsPage;

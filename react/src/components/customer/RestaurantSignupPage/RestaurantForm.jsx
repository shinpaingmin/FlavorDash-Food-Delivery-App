import { FaStore, FaPhoneAlt } from "react-icons/fa";
import {
    useGetRestaurantTownshipsQuery,
} from "../../../services";

const RestaurantForm = ({
    storeName,
    storeAddress,
    township,
    storePhone,
    updateFields,
    storeError
}) => {

    const {
        data: townshipsData,
        isLoading,
    } = useGetRestaurantTownshipsQuery();


    return (
        <div>
            <h1 className="font-bold text-3xl text-center mb-8">
                Restaurant form
            </h1>
            <div className="max-sm:w-full w-[500px]   m-auto  border border-gray-300 py-6 px-8 rounded-md">
                <div  className="mb-5 w-full">
                    <div className="mb-5 w-full">
                        <label htmlFor="storeName">Restaurant name</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black w-full"
                        >
                            <FaStore className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="text"
                                name="storeName"
                                className="w-full flex-1 focus:outline-none"
                                id="storeName"
                                placeholder="Enter your restuarnat name"
                                autoFocus
                                required
                                value={storeName}
                                onChange={(e) =>
                                    updateFields({ storeName: e.target.value })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.storeName && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.storeName}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="storeAddress">
                            Enter your restaurant address
                        </label>

                        <textarea
                            id="storeAddress"
                            name="storeAddress"
                            cols="30"
                            rows="10"
                            className=" border-2 rounded-md p-2.5 border-gray-300 mt-3
                            focus:border-2 focus:border-black w-full"
                            placeholder="Enter your restaurant address"
                            required
                            value={storeAddress}
                            onChange={(e) =>
                                updateFields({ storeAddress: e.target.value })
                            }
                        ></textarea>
                        {storeError?.data?.data?.storeAddress && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.storeAddress}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="township">
                            Select your restaurant township
                        </label>
                        <select
                            id="township"
                            name="township"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus:border-2 focus:border-black w-full block"
                            required
                            value={township}
                            onChange={(e) =>
                                updateFields({ township: e.target.value })
                            }
                        >
                            <option value="" selected disabled>
                                {isLoading ? "Loading townships ...." : "--- Select your restaurant township ---"}
                            </option>
                            {
                                townshipsData ? (
                                    townshipsData?.data?.map((i) => (
                                        <option value={i.id} key={i.id}>
                                            {i.township}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No available townships</option>
                                )
                            }
                        </select>
                        {storeError?.data?.data?.township && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.township}</div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="storePhone">Enter your business phone</label>
                        <div
                            className="flex items-center border-2 rounded-md p-2.5 border-gray-300 mt-3
                        focus-within:border-2 focus-within:border-black"
                        >
                            <FaPhoneAlt className="text-gray-500 mr-2 focus:text-black" />
                            <input
                                type="number"
                                name="storePhone"
                                className="flex-1 focus:outline-none"
                                id="phone"
                                placeholder="Enter your restaurant phone"
                                required
                                value={storePhone}
                                onChange={(e) =>
                                    updateFields({ storePhone: e.target.value })
                                }
                            />
                        </div>
                        {storeError?.data?.data?.storePhone && (
                            <div className="text-sm text-red-600 mt-2 text-justify">{storeError?.data?.data?.storePhone}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantForm;

import { useGetRestaurantTypesQuery } from "../../../services";

const MoreAboutRestaurant = ({
    type,
    pricing,
    opening_time,
    closing_time,
    from_day,
    to_day,
    image,
    updateFields,
    storeError,
}) => {
    const {
        data: typesData,
        error: typesError,
        isLoading: typesIsLoading,
    } = useGetRestaurantTypesQuery();

    return (
        <div>
            <h1 className="font-bold text-3xl text-center">More details</h1>

            <div className="max-sm:w-full w-[500px]   m-auto  border border-gray-300 py-6 px-8 rounded-md mt-8">
                <div className="mb-5 w-full">
                    <div className="mb-5">
                        <label htmlFor="type">
                            Select your restaurant type
                        </label>
                        <select
                            id="type"
                            name="type"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                            focus:border-2 focus:border-black w-full block"
                            required
                            value={type}
                            onChange={(e) =>
                                updateFields({ type: e.target.value })
                            }
                        >
                            <option value="" selected>
                                --- Select your restaurant type ---
                            </option>

                            {typesData &&
                                typesData?.data?.map((i) => (
                                    <option value={i.id} key={i.id}>
                                        {i.type}
                                    </option>
                                ))}
                        </select>
                        {storeError?.data?.data?.type && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.type}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="pricing">
                            Select your store price range
                        </label>
                        <select
                            onChange={(e) =>
                                updateFields({ pricing: e.target.value })
                            }
                            value={pricing}
                            id="pricing"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                                focus:border-2 focus:border-black w-full block"
                            required
                        >
                            <option value="" selected>
                                --- Select your restaurant price range ---
                            </option>
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                        </select>
                        {storeError?.data?.data?.pricing && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.pricing}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="opening_time">
                            Select your store opening time
                        </label>
                        <input
                            type="time"
                            id="opening_time"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                                focus:border-2 focus:border-black w-full block"
                            required
                            value={opening_time}
                            onChange={(e) =>
                                updateFields({ opening_time: e.target.value })
                            }
                        />
                        {storeError?.data?.data?.opening_time && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.opening_time}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="closing_time">
                            Select your store closing time
                        </label>
                        <input
                            type="time"
                            id="closing_time"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                                focus:border-2 focus:border-black w-full block"
                            required
                            value={closing_time}
                            onChange={(e) =>
                                updateFields({ closing_time: e.target.value })
                            }
                        />
                        {storeError?.data?.data?.closing_time && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.closing_time}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="from_day">
                            Select your store opening day from
                        </label>
                        <select
                            onChange={(e) =>
                                updateFields({ from_day: e.target.value })
                            }
                            value={from_day}
                            id="from_day"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                                focus:border-2 focus:border-black w-full block"
                            required
                        >
                            <option value="" selected>
                                --- Select your restaurant opening from ---
                            </option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        {storeError?.data?.data?.from_day && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.from_day}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="to_day">
                            Select your store opening day to
                        </label>
                        <select
                            onChange={(e) =>
                                updateFields({ to_day: e.target.value })
                            }
                            value={to_day}
                            id="to_day"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                                focus:border-2 focus:border-black w-full block"
                            required
                        >
                            <option value="" selected>
                                --- Select your restaurant opening to ---
                            </option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                        {storeError?.data?.data?.to_day && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.to_day}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="image">
                            Select your restaurant image
                        </label>

                        <input
                            type="file"
                            className="mt-3"
                            name="image"
                            id="image"
                            required

                            onChange={(e) =>
                                updateFields({ image: e.target.files[0] })
                            }
                        />
                        {storeError?.data?.data?.image && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.image}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreAboutRestaurant;

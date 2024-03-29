import { useGetDietariesQuery, useGetRestaurantTypesQuery } from "../../../services";

const MoreAboutRestaurant = ({
    type,
    dietary,
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
        isLoading,
    } = useGetRestaurantTypesQuery();

    const {
        data: dietaries,
        isLoading: dietariesLoading,
    } = useGetDietariesQuery();

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
                            <option value="" selected disabled>
                                {isLoading ? "Loading data ..." : "--- Select your restaurant type ---"}
                            </option>

                            {
                                typesData ? (
                                    typesData?.data?.map((i) => (
                                        <option value={i.id} key={i.id}>
                                            {i.type}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No restaurant type available</option>
                                )

                            }
                        </select>
                        {storeError?.data?.data?.type && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.type}
                            </div>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="type">
                            Select your restaurant&apos;s dietary (optional)
                        </label>
                        <select
                            id="dietary"
                            name="dietary"
                            className="border-2 rounded-md p-2.5 border-gray-300 mt-3
                            focus:border-2 focus:border-black w-full block"
                            value={dietary}
                            onChange={(e) =>
                                updateFields({ dietary: e.target.value })
                            }
                        >
                            <option value="" selected disabled>
                                {dietariesLoading ? "Loading data ..." : "--- Select your restaurant dietary ---"}
                            </option>

                            {
                                dietaries ? (
                                    dietaries?.data?.map((i) => (
                                        <option value={i.id} key={i.id} className="capitalize">
                                            {i.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No dietary available</option>
                                )

                            }


                            <option value="">None</option>
                        </select>
                        {storeError?.data?.data?.dietary && (
                            <div className="text-sm text-red-600 mt-2 text-justify">
                                {storeError?.data?.data?.dietary}
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
                            <option value="" selected disabled>
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
                            <option value="" selected disabled>
                                --- Select your restaurant opening from ---
                            </option>
                            <option value={0}>Sunday</option>
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
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
                            <option value="" selected disabled>
                                --- Select your restaurant opening to ---
                            </option>
                            <option value={0}>Sunday</option>
                            <option value={1}>Monday</option>
                            <option value={2}>Tuesday</option>
                            <option value={3}>Wednesday</option>
                            <option value={4}>Thursday</option>
                            <option value={5}>Friday</option>
                            <option value={6}>Saturday</option>
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

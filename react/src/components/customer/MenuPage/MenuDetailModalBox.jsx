import { useState } from "react";

const MenuDetailModalBox = ({ setIsMenuBoxOpen }) => {
    const [selectedVar, setSelectedVar] = useState("");
    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll">
                <div className="w-full h-[300px] overflow-hidden">
                    <img
                        src="https://images.deliveryhero.io/image/fd-mm/Products/1950995.jpg??width=500"
                        alt="food menu"
                        className="w-full h-full object-cover object-center rounded-t-xl"
                    />
                    <span
                        className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                        onClick={setIsMenuBoxOpen}
                    >
                        &times;
                    </span>
                </div>

                <div className="px-6 py-4">
                    <h1 className="text-gray-700 text-2xl font-bold">
                        Cheesie Pizza
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Tomato sauce, double cheese
                    </p>
                    <p className="text-gray-700 text-lg font-semibold mt-2">
                        20,000 MMK
                    </p>
                    <hr className="my-3" />

                    <div className="bg-[#f9ebd2] rounded-xl border p-4">
                        <div className="flex justify-between">
                            <h1 className="text-gray-800 text-lg font-bold">
                                Variations
                            </h1>
                            <p className="rounded-full text-white bg-orange px-2 text-sm grid items-center">
                                Required
                            </p>
                        </div>
                        <div className="my-2">
                            <input
                                type="radio"
                                value="normal"
                                id="normal"
                                onClick={() => setSelectedVar("normal")}
                                checked={selectedVar === "normal"}
                            />
                            <label htmlFor="normal" className="text-sm ml-2">
                                Normal size
                            </label>
                        </div>
                        <div className="mb-2">
                            <input
                                type="radio"
                                value="large"
                                id="large"
                                onClick={() => setSelectedVar("large")}
                                checked={selectedVar === "large"}
                            />
                            <label htmlFor="large" className="text-sm ml-2">
                                Large size
                            </label>
                        </div>
                        <div className="mb-2">
                            <input
                                type="radio"
                                value="xl"
                                id="xl"
                                onClick={() => setSelectedVar("xl")}
                                checked={selectedVar === "xl"}
                            />
                            <label htmlFor="xl" className="text-sm ml-2">
                                Extra large size
                            </label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-gray-800 text-lg font-bold mb-2">
                            Frequently bought together
                        </h1>
                        <p className="mb-3 text-gray-600">
                            People near you liked those.
                        </p>
                        <div className="overflow-y-auto h-56">
                            <div className="flex items-center mb-2 justify-between cursor-pointer hover:bg-[#f9ebd2] p-2 rounded-xl">
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <div className="w-12 h-12 overflow-hidden">
                                        <img
                                            src="https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/qss_kfc_mm/fda8e0bbddb37ff8d704782bfa780b81.jpg?width=120&height=120"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-semibold">2000 MMK</p>
                            </div>
                            <div className="flex items-center mb-2 justify-between cursor-pointer hover:bg-[#f9ebd2] p-2 rounded-xl">
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <div className="w-12 h-12 overflow-hidden">
                                        <img
                                            src="https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/qss_kfc_mm/fda8e0bbddb37ff8d704782bfa780b81.jpg?width=120&height=120"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-semibold">2000 MMK</p>
                            </div>
                            <div className="flex items-center mb-2 justify-between cursor-pointer hover:bg-[#f9ebd2] p-2 rounded-xl">
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <div className="w-12 h-12 overflow-hidden">
                                        <img
                                            src="https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/qss_kfc_mm/fda8e0bbddb37ff8d704782bfa780b81.jpg?width=120&height=120"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-semibold">2000 MMK</p>
                            </div>
                            <div className="flex items-center mb-2 justify-between cursor-pointer hover:bg-[#f9ebd2] p-2 rounded-xl">
                                <div className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <div className="w-12 h-12 overflow-hidden">
                                        <img
                                            src="https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/qss_kfc_mm/fda8e0bbddb37ff8d704782bfa780b81.jpg?width=120&height=120"
                                            alt=""
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-600 font-semibold">2000 MMK</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-gray-800 text-lg font-bold mb-2">
                            Special instructions
                        </h1>
                        <p className="mb-3 text-gray-600">
                            Any special preferences? Let the restaurant know.
                        </p>
                        <textarea
                            cols="30"
                            rows="10"
                            className="w-full p-2 border border-gray-300 rounded-xl"
                        ></textarea>
                    </div>

                    <div className="mt-3">
                        <h1 className="text-gray-800 text-lg font-bold mb-2">
                            If this item is not avaibable
                        </h1>
                        <select className="w-full border p-2 rounded-xl border-gray-300">
                            <option value="">Remove it from my order</option>
                            <option value="">Contact me</option>
                        </select>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <div className="flex items-center justify-between  w-max bg-white ">
                            <button
                                className=" flex items-center justify-center font-bold flex-1
                                    bg-orange hover:opacity-90 text-white px-2 rounded-full w-8 h-8"
                            >
                                &#8211;
                            </button>
                            <p className="mx-2  font-bold">3</p>
                            <button
                                className=" flex items-center justify-center font-bold flex-1
                                    bg-orange hover:opacity-90 text-white px-2 rounded-full w-8 h-8"
                            >
                                &#43;
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-orange text-white p-3 flex-auto ml-3"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuDetailModalBox;

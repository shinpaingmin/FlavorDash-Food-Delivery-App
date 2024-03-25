import { useState } from "react";

const MenuDetailModalBox = ({ image, name, short_desc, normal_price, discount_price, ifUnavailable, setIfUnavailable, setIsMenuBoxOpen }) => {

    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll">
                <div className="w-full h-[300px] overflow-hidden">
                    <img
                        src={`http://localhost:8000/storage/${image}`}
                        alt={name}
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
                        {name}
                    </h1>
                    <p className="my-2 text-gray-600">
                        {short_desc && short_desc}
                    </p>
                   <div className="flex mt-2">
                   {
                        discount_price && (
                            <del className="text-gray-700 text-lg font-semibold mr-3">{discount_price.toLocaleString()} MMK</del>
                        )
                    }
                    <p className='text-gray-700 text-lg font-semibold '>{normal_price.toLocaleString()} MMK</p>
                   </div>
                    <hr className="my-3" />



                    <div className="mt-3">
                        <h1 className="text-gray-800 text-lg font-bold mb-2">
                            Special instructions
                        </h1>
                        <p className="mb-3 text-gray-600">
                            Any special preferences? Let the restaurant know. (optional)
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
                        <select className="w-full border p-2 rounded-xl border-gray-300" value={ifUnavailable}
                            onChange={() => setIfUnavailable(e.target.value)}
                        >
                            <option value="contact">Contact me (default)</option>
                            <option value="remove">Remove it from my order</option>
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

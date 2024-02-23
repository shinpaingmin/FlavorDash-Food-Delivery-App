import { useState } from "react";

const MenuDetailModalBox = ({ setIsMenuBoxOpen }) => {
    const [selectedVar, setSelectedVar] = useState("");
    return (
            <div
                className="fixed top-0 left-0 w-full h-full z-10
                bg-black/50 flex items-center justify-center"
            >
                <div className="animate w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-x-scroll">
                    <div className="w-full h-[300px] overflow-hidden">
                        <img src="https://images.deliveryhero.io/image/fd-mm/Products/1950995.jpg??width=500" alt="food menu"
                            className="w-full h-full object-cover object-center rounded-t-xl"
                        />
                        <span  className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                            onClick={setIsMenuBoxOpen}>&times;</span>
                    </div>

                    <div className="px-6 py-4">
                        <h1 className="text-gray-700 text-2xl font-bold">
                            Cheesie Pizza
                        </h1>
                        <p className="mt-2 text-gray-600">Tomato sauce, double cheese</p>
                        <p className="text-gray-700 text-lg font-semibold mt-2">20,000 MMK</p>
                        <hr className="my-3" />

                        <div className="bg-[#f9ebd2] rounded-xl border p-4">
                            <div className="flex justify-between">
                                <h1 className="text-gray-800 text-lg font-bold">Variations</h1>
                                <p className="rounded-full text-white bg-orange px-2 text-sm grid items-center">Required</p>
                            </div>
                            <div className="my-2">
                                <input type="radio" value="normal" id="normal"
                                    onClick={() => setSelectedVar("normal")}
                                    checked={selectedVar === "normal"}
                                />
                                <label htmlFor="normal" className="text-sm ml-2">Normal size</label>
                            </div>
                            <div className="mb-2">
                                <input type="radio" value="large" id="large"
                                    onClick={() => setSelectedVar("large")}
                                    checked={selectedVar === "large"}
                                />
                                <label htmlFor="large" className="text-sm ml-2">Large size</label>
                            </div>
                            <div className="mb-2">
                                <input type="radio" value="xl" id="xl"
                                    onClick={() => setSelectedVar("xl")}
                                    checked={selectedVar === "xl"}
                                />
                                <label htmlFor="xl" className="text-sm ml-2">Extra large size</label>
                            </div>
                        </div>

                        <h1>Additional Information</h1>
                        <textarea cols="30" rows="10"
                            className="border p-2 w-full"></textarea>
                    </div>
                </div>
            </div>
    )
}

export default MenuDetailModalBox

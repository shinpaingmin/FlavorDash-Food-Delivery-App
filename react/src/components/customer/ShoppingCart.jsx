import { ImBin } from "react-icons/im";

const ShoppingCart = ({ handleOpenCart }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
            bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[500px] h-[450px] bg-[#fefefe] relative   px-6 py-4">
                <h1 className="font-bold text-2xl text-center">Cart</h1>
                <span
                    className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                    onClick={handleOpenCart}
                >
                    &times;
                </span>

                <div className="border-t border-t-gray-300 border-dotted mb-3 h-[320px] hideScrollbar overflow-auto">
                    <div className="mt-3 flex border shadow-sm">
                        <div className="w-32 h-24">
                            <img
                                src="https://geekrobocook.com/wp-content/uploads/2021/04/KFC-Chicken-fry.jpg"
                                alt=""
                                className="w-full h-full object-cover bg-gray-500"
                            />
                        </div>
                        <div className="flex items-center justify-between flex-1 p-2.5">
                            <div>
                                <h3 className="text-sm font-bold mb-3">
                                    KFC chicken
                                </h3>
                                <div className="flex items-center mt-3.5">
                                    <div className="flex items-center justify-between border w-max bg-white ">
                                        <button
                                            className=" flex items-center justify-center font-bold flex-1
                                            bg-orange hover:opacity-90 text-white px-2"
                                        >
                                            &#8211;
                                        </button>
                                        <p className="mx-2 text-sm font-bold">
                                            3
                                        </p>
                                        <button
                                            className=" flex items-center justify-center font-bold flex-1
                                            bg-orange hover:opacity-90 text-white px-2"
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                    <p className="ml-2 text-sm font-bold">
                                        x $40
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-bold">$120</p>
                            <div className="border border-gray-300 p-2 cursor-pointer">
                                <ImBin />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex border shadow-sm">
                        <div className="w-32 h-24">
                            <img
                                src="https://cicili.tv/wp-content/uploads/2020/09/Ma-la-xiang-guo-3-scaled.jpg"
                                alt=""
                                className="w-full h-full object-cover bg-gray-500"
                            />
                        </div>
                        <div className="p-2.5">
                            <h3 className="text-sm font-bold">
                                Mala xiang gou
                            </h3>
                        </div>
                    </div>
                    <div className="mt-3 flex border shadow-sm">
                        <div className="w-32 h-24">
                            <img
                                src="https://en.ardeche-guide.com/sites/default/files/sit/data/media/images/134244/boulieu_pizz-7728144.jpg"
                                alt=""
                                className="w-full h-full object-cover bg-gray-500"
                            />
                        </div>
                        <div className="p-2.5">
                            <h3 className="text-sm font-bold">Pizza</h3>
                        </div>
                    </div>
                    <div className="mt-3 flex border shadow-sm">
                        <div className="w-32 h-24">
                            <img
                                src="https://sudachirecipes.com/wp-content/uploads/2023/07/kimchi-nabe-thumb-500x500.jpg"
                                alt=""
                                className="w-full h-full object-cover bg-gray-500"
                            />
                        </div>
                        <div className="p-2.5">
                            <h3 className="text-sm font-bold">Hotpot</h3>
                        </div>
                    </div>
                </div>

                <div className="border-t border-t-gray-300 border-dashed">
                    <div className="mt-3 flex justify-between items-center">
                        <h2 className="font-bold">Total: $400</h2>
                        <button className="px-4 py-2 bg-orange text-white hover:opacity-90">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;

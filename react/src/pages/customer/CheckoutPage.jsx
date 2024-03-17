import { FaLocationDot } from "react-icons/fa6";
import TipsBtn from "../../components/customer/CheckoutPage/TipsBtn";
import OrderBtn from "../../components/customer/CheckoutPage/OrderBtn";

const CheckoutPage = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row px-4 lg:px-8 pt-8 border-t border-t-gray-200 max-w-[1200px] mx-auto">
            <div className="w-full lg:w-[60%] shrink-0">
                <div className="relative lg:mb-6 lg:p-4 py-2 lg:shadow  mb-12 rounded-md  ">
                    <button
                        className="absolute top-5 right-4 text-sm text-orange
                     hover:text-white hover:bg-orange rounded-full px-2 py-1 font-semibold"
                    >
                        Change
                    </button>
                    <h1 className="text-gray-700 text-2xl font-bold">
                        Delivery address
                    </h1>
                    <div className="flex mt-6">
                        <FaLocationDot className="text-gray-700" />
                        <div className="translate-y-[-5px] ml-2">
                            <p>2 Oakkyin Butaryone Street, Hlaing</p>
                            <p>Yangon</p>
                            <p>Floor: Ground floor</p>
                            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis expedita repellat repellendus.</p> */}
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div className="flex items-center">
                        <p className="mr-3">Contactless delivery</p>
                        <label className="switch ">
                            <input type="checkbox" />
                            <span className="slider round hover:bg-gray-400"></span>
                        </label>
                    </div>
                </div>



                <div className="relative lg:p-4 py-2 lg:shadow  mb-12 rounded-md lg:mb-6  ">
                    <button
                        className="absolute top-5 right-4 text-orange
                     hover:text-white hover:bg-orange rounded-full px-4 font-semibold"
                    >
                        Edit
                    </button>
                    <h1 className="text-gray-700 text-2xl font-bold mb-6">
                        Personal Details
                    </h1>
                    <p>Shin Paing Min</p>
                    <p>shinpaingmin@gmail.com</p>
                    <p>+959 794219842</p>
                </div>

                {/* <div className="lg:p-4 py-2 lg:shadow  mb-12 rounded-md lg:mb-6 ">
                    <h1 className="text-gray-700 text-2xl font-bold mb-6">
                        Tip your rider
                    </h1>
                    <p>
                        100% of the tip goes to our riders. Share good blessings
                        and fortune!
                    </p>
                    <div className="flex justify-between items-center my-6">
                        <TipsBtn tipAmount="500 MMK" />
                        <TipsBtn tipAmount="1000 MMK" />
                        <TipsBtn tipAmount="1500 MMK" />
                        <TipsBtn tipAmount="2000 MMK" />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="saveit"
                            className="mr-2 w-4 h-4"
                        />
                        <label htmlFor="saveit">
                            Save it for the next order.
                        </label>
                    </div>
                </div> */}

                <OrderBtn />
            </div>

            <div className="lg:ml-12 lg:p-4 py-2 lg:shadow  max-lg:mb-12 flex-auto lg:sticky lg:top-[80px] lg:self-start">
                <h1 className="text-gray-700 text-2xl font-bold mb-2">
                    Your order slip
                </h1>
                <p className="text-sm mb-6">KFC chicken (hlaing)</p>
                <div className="flex justify-between">
                    <p className="text-pretty text-justify w-[70%]">
                        1 x Double Cheese (Margherita)
                    </p>
                    <p>10000 MMK</p>
                </div>
                <hr className="mt-6 mb-8" />
                <div className="flex justify-between mb-3">
                    <p>Subtotal</p>
                    <p>10000 MMK</p>
                </div>
                <div className="flex justify-between mb-3">
                    <p>Delivery fee</p>
                    <p>1000 MMK</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700 text-2xl font-bold">Total</p>
                    <p className="text-gray-700 text-2xl font-bold">
                        11,000 MMK
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;

import { FaMoneyBill } from "react-icons/fa";
import SubmitBtn from "./SubmitBtn";

const ReorderModalBox = ({ setIsReorderModalOpen }) => {
  return (
    <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll px-8 pt-8 pb-4">
                <span
                    className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                    onClick={setIsReorderModalOpen}
                >
                    &times;
                </span>

                <h1 className="text-2xl text-gray-700 font-bold mt-3">
                    Order again
                </h1>
                <p className="mt-2 text-gray-600 font-semibold">
                    KFC Myanmar(Parami)
                </p>
                <p className="mt-2 text-gray-600 font-semibold text-sm">
                    The order history from this store is as follow.
                </p>

                <div className="mt-6 p-4 border border-gray-300 rounded-md border-dashed">
                    <div className="flex items-center">
                        <p className="text-gray-600 font-semibold mr-2">Order ID : </p>
                        <p className="text-gray-600 font-semibold">#fd239i2</p>
                    </div>
                    <div className="mt-3 flex items-center">
                        <p className="text-gray-600 font-semibold mr-2">Delivered to : </p>
                        <p className="text-gray-600 font-semibold">No.123, Oakkyin, Hlaing</p>
                    </div>
                    <div className="mt-3 flex items-center">
                        <p className="text-gray-600 font-semibold mr-2">Delivered time : </p>
                        <p className="text-gray-600 font-semibold">Wed, May 13, 2:00 PM</p>
                    </div>
                </div>

                <h1 className="text-gray-700 font-bold text-xl mt-6">Order summary</h1>

                <div className="flex items-center justify-between mt-3">
                    <p className="font-semibold text-gray-600 mr-3">4 x Fried chicken (spicy)</p>
                    <p className="font-semibold text-gray-600">10,000 MMK</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-gray-600 mr-3">2 x Hamburger</p>
                    <p className="font-semibold text-gray-600">12,000 MMK</p>
                </div>

                <hr className="my-6" />

                <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-600 mr-3">Subtotal</p>
                    <p className="font-semibold text-gray-600">22,000 MMK</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-gray-600 mr-3">Delivery fee</p>
                    <p className="font-semibold text-gray-600">1000 MMK</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-gray-600 mr-3">Vouncher: dfks2309</p>
                    <p className="font-semibold text-gray-600">- 6000 MMK</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-gray-600 mr-3">Total</p>
                    <p className="font-semibold text-gray-600">17,000 MMK</p>
                </div>

                <hr className="my-6" />

                <h1 className="text-gray-700 font-bold text-xl mb-3">Paid with</h1>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <FaMoneyBill className="text-gray-600 mr-2" size={20} />
                        <p className="text-gray-600 font-semibold">Cash on Deli</p>
                    </div>
                    <p>17,000 MMK</p>
                </div>

                <div className="flex justify-center mb-3">
                    <SubmitBtn btnTitle="Order again" />
                </div>
            </div>
        </div>
  )
}

export default ReorderModalBox

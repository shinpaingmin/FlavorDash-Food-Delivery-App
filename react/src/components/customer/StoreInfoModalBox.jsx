import { IoTimeOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";

const StoreInfoModalBox = ({ setIsStoreInfoModalOpen }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll px-8 pt-8 pb-4">
                <span
                    className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                    onClick={setIsStoreInfoModalOpen}
                >
                    &times;
                </span>

                <h1 className="text-2xl text-gray-700 font-bold mt-3 mb-6">
                    KFC Myanmar (Parami)
                </h1>

                <div className="flex items-center">
                    <IoTimeOutline className="mr-2 text-gray-600" size={22} />
                    <p className="text-gray-600 font-semibold text-lg">
                        Now open until 8:00 PM
                    </p>
                </div>

                <div className="flex mt-1 ml-7">
                    <p className="text-gray-600 font-semibold mr-12">
                        Sun - Sat
                    </p>
                    <p className="text-gray-600 font-semibold">
                        9:00 AM - 8:00 PM
                    </p>
                </div>

                <div className="flex items-center mt-6">
                    <SlLocationPin className="mr-2 text-gray-600" size={22} />
                    <p className="text-gray-600 font-semibold text-lg">
                        Sein Gay Har, Parami Housing, Parami Rd.
                    </p>
                </div>

                <div className="w-full h-72 my-6 rouned-md">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.3769307212947!2d96.11918887497275!3d16.857238583942273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c195b26bddde79%3A0xf5dc84408b514cf5!2sKFC%20Parami%20Sein%20Gay%20Har!5e0!3m2!1sen!2smm!4v1709126353295!5m2!1sen!2smm"
                    width="100%"
                    height="100%"
                    className="rounded-md"
                    allowfullscreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

                <p className="text-gray-700 font-bold mb-2 text-xl">
                    Delivery fee
                </p>
                <p className="text-gray-600 font-semibold">
                    Delivery fee is charged based on time of day, distance, and
                    surge conditions
                </p>
            </div>
        </div>
    );
};

export default StoreInfoModalBox;

import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import FeedbackBtn from "./FeedbackBtn";

const FeedbackModalBox = ({ setIsFeedbackModalOpen }) => {
    const [selectedRatingStars, setSelectedRatingStars] = useState('');
    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll px-4 pb-4">
                <span
                    className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                    onClick={setIsFeedbackModalOpen}
                >
                    &times;
                </span>

                <h1 className="text-2xl text-gray-700 font-bold mt-3">
                    Feedback
                </h1>
                <p className="mt-2 text-gray-600 font-semibold">
                    KFC Myanmar(Hlaing)
                </p>
                <p className="mt-2 text-gray-600 font-semibold text-sm">
                    Your email address will not be published. Required fields are marked as *
                </p>
                <div className="mt-6 flex items-center">
                    <p className="mr-5 text-gray-600 font-semibold">Your rating * : </p>

                        {
                            !selectedRatingStars ? (
                                <div className=" flex items-center">
                                    <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars("1")} />
                                    <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars("2")} />
                                    <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars("3")} />
                                    <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars("4")} />
                                    <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars("5")} />
                                </div>
                            ) : (
                                <div className="flex items-center">

                                    {
                                        [...Array(5)].map((_ , i) => (
                                            i < selectedRatingStars ? (
                                                <FaStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars(i+1)} key={i} />
                                            ) : (
                                                <FaRegStar color="#ff9529" size={20} className="mr-1" onClick={() => setSelectedRatingStars(i+1)} key={i} />
                                            )
                                        ))
                                    }
                                </div>

                            )
                        }

                </div>

                <div className="mt-6 flex items-center">
                    <p className="mr-7 text-gray-600 font-semibold">Food type * : </p>
                    <select className="border border-gray-600 w-1/2 rounded-md p-1.5">
                        <option value="" selected disabled>Choose the type of food</option>
                        <option value="1">Chicken</option>
                        <option value="2">Pizza</option>
                    </select>
                </div>

                <div className="mt-6 flex ">
                    <p className="mr-4 text-gray-600 font-semibold">Your review * : </p>
                    <textarea cols="30" rows="10" className="border border-gray-600 rounded-md p-1.5 w-[58%]"></textarea>
                </div>


                <div className="grid place-items-center mt-12 ">
                    <FeedbackBtn />
                </div>

            </div>
        </div>
    );
};

export default FeedbackModalBox;

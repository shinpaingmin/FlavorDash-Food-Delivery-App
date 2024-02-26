import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Ratings from "./Ratings";
import RatingSortBtn from "./RatingSortBtn";
import ReviewBox from "./ReviewBox";

const ReviewsModalBox = ({ setIsReviewModalOpen }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full z-[9999]
                bg-black/50 flex items-center justify-center"
        >
            <div className="animate w-[90%] lg:w-[40%] h-[650px] bg-[#fefefe] relative rounded-xl overflow-y-scroll px-4 pb-4">
                <span
                    className="font-bold text-3xl cursor-pointer absolute top-2.5 right-5"
                    onClick={setIsReviewModalOpen}
                >
                    &times;
                </span>

                <h1 className="text-2xl text-gray-700 font-bold mt-3">Reviews</h1>
                <p className="mt-2 text-gray-600 font-semibold">KFC Myanmar(Hlaing)</p>
                <div className="p-4 flex items-center justify-between border border-gray-300 mt-8 rounded-xl">
                    <div className="w-1/2">
                        <div className="flex items-center">
                            <FaStar color="#ff9529" size={22} />
                            <h1 className="ml-2 text-2xl font-semibold text-gray-700">4.5</h1>
                        </div>
                        <p className="text-gray-600 font-semibold">Total ratings (10000+)</p>
                    </div>
                    <div className="w-1/2">

                        <Ratings rating="5" percent="70%" FaStar={FaStar} />
                        <Ratings rating="4" percent="15%" FaStar={FaStar} />
                        <Ratings rating="3" percent="10%" FaStar={FaStar} />
                        <Ratings rating="2" percent="3%" FaStar={FaStar} />
                        <Ratings rating="1" percent="2%" FaStar={FaStar} />

                    </div>
                </div>

                <div className="mt-6">
                    <RatingSortBtn sortOption="Newest" />
                    <RatingSortBtn sortOption="Highest Rating" />
                    <RatingSortBtn sortOption="Lowest Rating" />
                </div>

                <ReviewBox FaStar={FaStar} FaStarHalfAlt={FaStarHalfAlt} />
                <ReviewBox FaStar={FaStar} FaStarHalfAlt={FaStarHalfAlt} />
                <ReviewBox FaStar={FaStar} FaStarHalfAlt={FaStarHalfAlt} />
                <ReviewBox FaStar={FaStar} FaStarHalfAlt={FaStarHalfAlt} />
                <ReviewBox FaStar={FaStar} FaStarHalfAlt={FaStarHalfAlt} />
            </div>
        </div>
    );
};

export default ReviewsModalBox;

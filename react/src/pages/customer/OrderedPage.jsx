import { useState } from "react";
import OrderedCard from "../../components/customer/OrderedPage/OrderedCard";
import FeedbackModalBox from "../../components/customer/OrderedPage/FeedbackModalBox";

const OrderedPage = () => {
    const [isFeedbackModalOpen, _setIsFeedbackModalOpen] = useState(false);

    const setIsFeedbackModalOpen = () => {
        if(!isFeedbackModalOpen) {
            _setIsFeedbackModalOpen(!isFeedbackModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsFeedbackModalOpen(!isFeedbackModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    }

    return (
        <div className="max-w-[1519px] px-4 lg:px-8 pt-8 border-t border-t-gray-200">
            <h1 className="text-2xl text-gray-700 font-bold">Ordered items</h1>
            <p className="text-gray-600 font-semibold mt-2">
                Ordered items can be ordered again by choosing &apos;{" "}
                <span className="font-semibold text-black">Order again</span>{" "}
                &apos; option in the dropdown menu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 mt-10">
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                <OrderedCard setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
            </div>
            {
                isFeedbackModalOpen && <FeedbackModalBox setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
            }
        </div>
    );
};

export default OrderedPage;

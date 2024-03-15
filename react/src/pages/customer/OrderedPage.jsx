import { useRef, useState } from "react";
import OrderedCard from "../../components/customer/OrderedPage/OrderedCard";
import FeedbackModalBox from "../../components/customer/OrderedPage/FeedbackModalBox";
import ReorderModalBox from "../../components/customer/OrderedPage/ReorderModalBox";
import StoreInfoModalBox from "../../components/customer/StoreInfoModalBox";

const OrderedPage = () => {
    const [isReorderModalOpen, _setIsReorderModalOpen] = useState(false);
    const [isFeedbackModalOpen, _setIsFeedbackModalOpen] = useState(false);
    const [isStoreInfoModalOpen, _setIsStoreInfoModalOpen] = useState(false);
    const [activeMoreDetailsOpen, setActiveMoreDetailsOpen] = useState(null);
    const orderCard = useRef();

    const setIsReorderModalOpen = () => {
        if (!isReorderModalOpen) {
            _setIsReorderModalOpen(!isReorderModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsReorderModalOpen(!isReorderModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    };

    const setIsFeedbackModalOpen = () => {
        if (!isFeedbackModalOpen) {
            _setIsFeedbackModalOpen(!isFeedbackModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsFeedbackModalOpen(!isFeedbackModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    };

    const setIsStoreInfoModalOpen = () => {
        if (!isStoreInfoModalOpen) {
            _setIsStoreInfoModalOpen(!isStoreInfoModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsStoreInfoModalOpen(!isStoreInfoModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    };

    // dropdown close handler
    window.addEventListener("click", function (e) {
        if (activeMoreDetailsOpen) {
            if(!orderCard?.current?.contains(e.target)) {
                setActiveMoreDetailsOpen(null);
            }

        }
    });

    return (
        <div className="max-w-[1519px] px-4 lg:px-8 pt-8 border-t border-t-gray-200">
            <h1 className="text-2xl text-gray-700 font-bold">Ordered items</h1>
            <p className="text-gray-600 font-semibold mt-2">
                Ordered items can be reordered by choosing &apos;{" "}
                <span className="font-semibold text-black">Order again</span>{" "}
                &apos; option in the dropdown menu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-12 mt-10" ref={orderCard}>
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="1"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="2"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="3"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="4"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="5"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="6"
                />
                <OrderedCard
                    setIsReorderModalOpen={setIsReorderModalOpen}
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                    setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                    setActiveMoreDetailsOpen={setActiveMoreDetailsOpen}
                    activeMoreDetailsOpen={activeMoreDetailsOpen}
                    id="7"
                />
            </div>
            {isReorderModalOpen && (
                <ReorderModalBox
                    setIsReorderModalOpen={setIsReorderModalOpen}
                />
            )}
            {isFeedbackModalOpen && (
                <FeedbackModalBox
                    setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                />
            )}
            {
                isStoreInfoModalOpen && <StoreInfoModalBox setIsStoreInfoModalOpen={setIsStoreInfoModalOpen} />
            }
        </div>
    );
};

export default OrderedPage;

import { useSwiper } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRef } from 'react';

const SwiperNavButtons = () => {
    const swiper = useSwiper();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const handlePrevButton = () => {
        swiper.slidePrev();
        if(swiper.isBeginning) {
            prevRef.current.disabled = true;
            prevRef.current.classList.remove("bg-stone-300");
        }
        if(!swiper.isEnd) {
            nextRef.current.disabled = false;
            nextRef.current.classList.add("bg-stone-300");
        }
    }

    const handleNextButton = () => {
        swiper.slideNext();
        if(!swiper.isBeginning) {
            prevRef.current.disabled = false;
            prevRef.current.classList.add("bg-stone-300");
        }
        if(swiper.isEnd) {
            nextRef.current.disabled = true;
            nextRef.current.classList.remove("bg-stone-300");
        }
    }

    return (
        <div className='flex mt-3 float-right'>
            <button onClick={handlePrevButton}
                className="w-8 h-8 rounded-full  mr-3 grid place-items-center"
                ref={prevRef}

            >
                <FaArrowLeft />
            </button>
            <button onClick={handleNextButton}
                className='w-8 h-8 rounded-full bg-stone-300 mr-3 grid place-items-center'
                ref={nextRef}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}

export default SwiperNavButtons

import { Link } from "react-scroll";
import {
    FaRegHeart,
    FaStar,
    FaShippingFast,
    FaClock,
    FaShoppingCart,
} from "react-icons/fa";
import {
    IoIosArrowDroprightCircle,
    IoIosArrowDropleftCircle,
} from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCoupon3Fill } from "react-icons/ri";
import MenuCard from "../../components/customer/MenuPage/MenuCard";
import { useEffect, useMemo, useRef, useState } from "react";
import MenuDetailModalBox from "../../components/customer/MenuPage/MenuDetailModalBox";
import MoreDetailsDropdown from "../../components/customer/MenuPage/MoreDetailsDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsModalBox from "../../components/customer/MenuPage/ReviewsModalBox";
import { useAddItemsToCartMutation, useGetProductsByCategoriesQuery, useGetTheProductQuery, useGetTheRestaurantQuery } from "../../services";
import StoreInfoModalBox from "../../components/customer/StoreInfoModalBox";

const INIT_DATA = {
    cart_item: {
        user_id: "",
        restaurant_id: "",
        menu_item_id: "",
        total_price: "",
        total_quantity: "",
        instruction: "",
        if_unavailable: "",
    },
    add_on_items: {
        add_on_id: "",
        total_price: "",
        total_quantity: "",
    }
}

const MenuPage = () => {
    const {id} = useParams();
    const {data: products, isLoading} = useGetProductsByCategoriesQuery(id);
    const {data: restaurant} = useGetTheRestaurantQuery(id);
    const [addItemsToCart, {isSuccess, isError, error}] = useAddItemsToCartMutation();
    const [ifUnavailable, setIfUnavailable] = useState('contact');
    const [isMenuBoxOpen, _setIsMenuBoxOpen] = useState(null);  // if the box is open, the id will be set
    const {data: product} = useGetTheProductQuery(isMenuBoxOpen, {
        skip: isMenuBoxOpen === null
    });
    const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
    const [isReviewModalOpen, _setIsReviewModalOpen] = useState(false);
    const [isStoreInfoModalOpen, _setIsStoreInfoModalOpen] = useState(false);
    const [activeArr, setActiveArr] = useState(null);
    const linkList = useRef(null);
    const rightArr = useRef(null);
    const leftArr = useRef(null);
    const navigate = useNavigate();
    const dropdown = useRef();
// console.log(products);
console.log(restaurant);

    const addToCart = (e) => {
        e.preventDefault();

        addItemsToCart();
    }

    const setIsMenuBoxOpen = (id="") => {
        if (isMenuBoxOpen) {
            _setIsMenuBoxOpen(null);
            document.body.classList.remove("stop-scrolling");
        } else {
            _setIsMenuBoxOpen(id);
            document.body.classList.add("stop-scrolling");
        }
    };

    const setIsReviewModalOpen = () => {
        if(!isReviewModalOpen) {
            _setIsReviewModalOpen(!isReviewModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsReviewModalOpen(!isReviewModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    }

    const setIsStoreInfoModalOpen = () => {
        if (!isStoreInfoModalOpen) {
            _setIsStoreInfoModalOpen(!isStoreInfoModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsStoreInfoModalOpen(!isStoreInfoModalOpen);
            document.body.classList.remove("stop-scrolling");
        }
    };

    const directToCheckout = () => {
        navigate("/checkout");
    };

    const handleArrowsDisplay = () => {
        if (linkList.current.scrollLeft > 0) {
            leftArr.current.classList.remove("hidden");
            leftArr.current.classList.add("d-block");
        } else {
            leftArr.current.classList.remove("d-block");
            leftArr.current.classList.add("hidden");
        }

        const maxScrollValue =
            linkList.current.scrollWidth - linkList.current.clientWidth;

        if (linkList.current.scrollLeft >= maxScrollValue) {
            rightArr.current.classList.remove("d-block");
            rightArr.current.classList.add("hidden");
        } else {
            rightArr.current.classList.remove("hidden");
            rightArr.current.classList.add("d-block");
        }
    };

    const scrollLeft = () => {
        linkList.current.scrollLeft += 200;
        setActiveArr((prevActiveArr) => !prevActiveArr);
    };

    const scrollRight = () => {
        linkList.current.scrollLeft -= 200;
        setActiveArr((prevActiveArr) => !prevActiveArr);
    };

    useEffect(() => {
        handleArrowsDisplay();

    }, [activeArr]);

    // picking up categories from products
    const categories = useMemo(() => {
        let formattedCategories = [];

        if(products?.data) {
            formattedCategories = Object.keys(products.data);
        }

        if(formattedCategories?.includes('Popular')) {
            let index = formattedCategories.indexOf('Popular');
            formattedCategories.splice(index, 1);
            formattedCategories.unshift('Popular');
        }

        return formattedCategories;
    }, [products])

    window.addEventListener("click", function(e) {
        if(isMoreDetailsOpen) {
            if(!dropdown?.current.contains(e.target)) {
                setIsMoreDetailsOpen(false);
            }
        }
    })

    return (
        <div className="flex justify-between px-4 lg:px-8 pt-8 border-t border-t-gray-200 max-w-[1519.2px]">
            <div className="w-full xl:w-3/4 mr-4">
                <div className="w-full h-80 mb-4 relative overflow-hidden">
                    <img
                        src={`http://localhost:8000/storage/${restaurant?.data.image}`}
                        alt={restaurant?.data.name}
                        className="w-full h-full object-cover object-center rounded-md bg-gray-300"
                    />
                    <div
                        className="absolute top-2 right-2 mr-12 cursor-pointer
                    w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"
                    >
                        <FaRegHeart className="text-orange" />
                    </div>
                    <div
                        className="absolute top-2 right-2 cursor-pointer
                    w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"
                        onClick={() => setIsMoreDetailsOpen(!isMoreDetailsOpen)}
                        ref={dropdown}
                    >
                        <HiOutlineDotsHorizontal className="text-orange" />
                    </div>

                    {/* More details dropdown  */}

                    {isMoreDetailsOpen && (
                        <MoreDetailsDropdown
                            setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                            setIsReviewModalOpen={setIsReviewModalOpen}
                        />
                    )}


                    {/* Review modal box  */}
                    {
                        isReviewModalOpen && <ReviewsModalBox setIsReviewModalOpen={setIsReviewModalOpen} />
                    }

                    {/* Store info modal box  */}
                    {
                        isStoreInfoModalOpen && <StoreInfoModalBox {...restaurant?.data} setIsStoreInfoModalOpen={setIsStoreInfoModalOpen} />
                    }
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="text-2xl font-bold mr-4">{restaurant?.data.name}</h1>
                    <div className="flex items-center mr-1">
                        <FaStar color="#ff9529" size={22} className="mr-1" />
                        <h1 className="text-base">{
                            restaurant?.data.reviews_avg_rating_star ?? "No rating yet"
                        }</h1>
                    </div>
                    <div className="text-base">({restaurant?.data.reviews_count})</div>
                </div>
                <div className="flex items-center mb-3">
                    <FaClock />
                    <p className="mr-3 ml-1">35 mins</p>
                    <FaLocationDot />
                    <p className="ml-1 mr-3">2 km</p>
                    <FaShippingFast />
                    <p className="ml-1">1000MMK</p>
                </div>

                <div className="block lg:flex items-center py-4 sticky top-[76px] z-[2] bg-white lg:mb-8">
                    <div
                        className="flex w-full lg:w-64 h-12 mr-12 bg-white items-center flex-shrink-0
                            rounded-md border border-slate-300 md:p-2 max-lg:mb-6
                            focus-within:border-black"
                    >
                        <input
                            type="text"
                            className="px-2 text-sm border-none focus:outline-none focus:ring-0 flex-1"
                            placeholder="Search for your favourite in menu"
                        />
                    </div>

                    <div className="flex lg:w-[72%]">
                        <div
                            onClick={scrollRight}
                            ref={leftArr}
                            className="hidden"
                        >
                            <IoIosArrowDropleftCircle
                                className="text-gray-700 mr-3 cursor-pointer"
                                size={32}
                            />
                        </div>
                        <div
                            className="overflow-x-scroll flex items-center hideScrollbar scroll-smooth"
                            ref={linkList}
                            onScroll={handleArrowsDisplay}
                        >
                            {
                                categories ? (
                                    categories.map((category) => (
                                        <Link
                                            key={category}
                                            className="font-semibold text-gray-700 mr-12 hoverEffect pb-1 relative cursor-pointer whitespace-nowrap"
                                            activeClass="active"
                                            to={category}
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                            offset={-180}
                                        >
                                            {category}
                                        </Link>
                                    ))
                                ) : (
                                    <div>Loading ...</div>
                                )
                            }
                        </div>
                        <div
                            onClick={scrollLeft}
                            ref={rightArr}
                            className="text-gray-700 ml-3 cursor-pointer"
                        >
                            <IoIosArrowDroprightCircle size={32} />
                        </div>
                    </div>
                </div>

                {
                    !isLoading ? (
                        categories?.length !== 0  ? (
                            categories.map((category) => (
                                <div className="mb-12" id={category} key={category}>
                                    <h1 className="mb-4 text-2xl font-bold">{category}</h1>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {

                                            products?.data[category].map((product) => (

                                                    <MenuCard
                                                        key={product.id}
                                                        id={product.id}
                                                        imgSrc={product.image}
                                                        imgName={product.name}
                                                        title={product.name}
                                                        normal_price={product.normal_price}
                                                        discount_price={product.discount_price}
                                                        Icon={FaShoppingCart}
                                                        setIsMenuBoxOpen={setIsMenuBoxOpen}
                                                    />

                                            ))

                                        }

                                    </div>
                                    {isMenuBoxOpen && (
                                        <MenuDetailModalBox
                                            {...product?.data}
                                            ifUnavailable={ifUnavailable}
                                            setIfUnavailable={setIfUnavailable}
                                            setIsMenuBoxOpen={setIsMenuBoxOpen}
                                        />
                                    )}
                            </div>
                            ))
                        ) : (
                            <div className="text-center text-2xl text-gray-500 font-semibold">No menu items found</div>
                        )
                    ) : (
                        <div className="text-center text-2xl text-gray-500 font-semibold">Loading ...</div>
                    )
                }

            </div>
            <div
                className="w-1/4 border border-slate-300 hidden xl:block
            h-[500px] self-start rounded-md sticky top-[80px] p-4 overflow-auto hideScrollbar"
            >
                <h1 className="text-xl font-bold">My Orders</h1>
                <div className="mt-5">
                    <p className="text-sm mb-2 font-bold text-gray-700">
                        Delivery address
                    </p>
                    <h1 className="text-lg font-bold mb-2 text-gray-700">
                        1341 Marris Street
                    </h1>
                    <div className="flex items-center">
                        <CiClock2 className="mr-1" />
                        <p className="text-sm mr-3">40 mins</p>
                        <CiLocationOn className="mr-1" />
                        <p className="text-sm">4 kms</p>
                    </div>
                </div>
                <div className="w-full h-24 border border-gray-300 my-5 rounded-xl flex items-start">
                    <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                        <img
                            src="https://ofs-cdn.italki.com/u/13069551/galaxy/post/c8fju0l7q9gcirq9i0o0.jpg"
                            alt="item"
                            className="rounded-xl object-cover object-center w-full h-full"
                        />
                    </div>
                    <div className="p-2 overflow-hidden">
                        <h2
                            className="overflow-hidden text-ellipsis
                         text-nowrap whitespace-nowrap text-sm"
                        >
                            <span>
                                Mont Hin Khar sdfs df sdfsd fsdf sdf sdf sdfsd
                                fs dfsd fs fs df sdf
                            </span>
                        </h2>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center justify-between border w-max bg-white">
                                <button
                                    className=" flex items-center justify-center font-bold flex-1
                                    bg-orange hover:opacity-90 text-white px-2"
                                >
                                    &#8211;
                                </button>
                                <p className="mx-2 text-sm font-bold">3</p>
                                <button
                                    className=" flex items-center justify-center font-bold flex-1
                                    bg-orange hover:opacity-90 text-white px-2"
                                >
                                    &#43;
                                </button>
                            </div>
                            <p className="font-bold">$239</p>
                        </div>
                    </div>
                </div>
                <hr className="mt-8" />

                <div className="my-3">
                    <div className="flex items-center justify-between">
                        <p>Subtotal:</p>
                        <p className="font-bold">$230</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p>Delivery Fee:</p>
                        <p className="font-bold">$10</p>
                    </div>

                    <div
                        className="border-2 border-orange bg-[#f9ebd2] w-full h-20
                        mt-3 p-3 rounded-xl flex items-center justify-between"
                    >
                        <p className="mr-2 text-sm">Save your money!</p>
                        <button
                            type="button"
                            className="bg-orange rounded-xl text-white px-4 py-3 flex items-center"
                        >
                            <RiCoupon3Fill />
                            <p className="ml-2 ">Apply coupon</p>
                        </button>
                    </div>
                </div>

                <hr />

                <div className="flex items-center justify-between p-3">
                    <p>Total:</p>
                    <p className="font-bold">$240</p>
                </div>

                <button
                    type="button"
                    className="w-full bg-orange rounded-xl text-white
                    py-3 flex items-center justify-center"
                    onClick={directToCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default MenuPage;

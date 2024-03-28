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
import MenuCard from "../../components/customer/MenuPage/MenuCard";
import { useEffect, useMemo, useRef, useState } from "react";
import MenuDetailModalBox from "../../components/customer/MenuPage/MenuDetailModalBox";
import MoreDetailsDropdown from "../../components/customer/MenuPage/MoreDetailsDropdown";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsModalBox from "../../components/customer/MenuPage/ReviewsModalBox";
import {
    useAddItemsToCartMutation,
    useDestroyCartItemMutation,
    useGetCartItemsQuery,
    useGetProductsByCategoriesQuery,
    useGetTheProductQuery,
    useGetTheRestaurantQuery,
    useGetUserDetailsQuery,
} from "../../services";
import StoreInfoModalBox from "../../components/customer/StoreInfoModalBox";
import toast, { Toaster } from "react-hot-toast";
import CartItem from "../../components/customer/MenuPage/CartItem";
import { noCartItem } from "../../assets/images";

const INIT_DATA = {
    cart_item: {
        // user_id: "",
        restaurant_id: "",
        menu_item_id: "",
        price: "",
        total_quantity: 1,
        instruction: "",
        if_unavailable: "contact",
    },
    add_on_items: {
        add_on_id: "",
        price: "",
        total_quantity: "",
    },
};

const MenuPage = () => {
    const { id } = useParams();
    const { data: products, isLoading } = useGetProductsByCategoriesQuery(id);
    const { data: restaurant } = useGetTheRestaurantQuery(id);
    const [formData, setFormData] = useState(INIT_DATA);
    const {data: userDetails} = useGetUserDetailsQuery();
    const [addItemsToCart, { isSuccess, isError, error }] = useAddItemsToCartMutation();
    const [isMenuBoxOpen, _setIsMenuBoxOpen] = useState(null); // if the box is open, the id will be set
    const { data: product } = useGetTheProductQuery(isMenuBoxOpen, {
        skip: isMenuBoxOpen === null,
    });
    const { data: cart_items } = useGetCartItemsQuery();
    const [isMoreDetailsOpen, setIsMoreDetailsOpen] = useState(false);
    const [isReviewModalOpen, _setIsReviewModalOpen] = useState(false);
    const [isStoreInfoModalOpen, _setIsStoreInfoModalOpen] = useState(false);
    const [activeArr, setActiveArr] = useState(null);
    const linkList = useRef();
    const rightArr = useRef();
    const leftArr = useRef();
    const navigate = useNavigate();
    const dropdown = useRef();
    const [destroyCartItem, {isSuccess: destroyItemSuccess}] = useDestroyCartItemMutation();

    const subTotal = useMemo(() => {
        if(cart_items?.data.length != 0) {
            return cart_items?.data[0].cart_items?.reduce((acc, item) => acc + (item.total_price) , 0)
        }
        return 0;
    }, [cart_items]);

    function calculateTotal() {

            if(subTotal ) {
                return subTotal + 1000;
            } else {
                return 0;
            }

    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Added to cart!", {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#bbf7d0",
                },
            });
            setFormData(INIT_DATA);
            setIsMenuBoxOpen(null);
        }
    }, [isSuccess]);

    const updateCartFields = (fields) => {
        setFormData((prev) => ({
            ...prev,
            cart_item: {
                ...prev.cart_item,
                ...fields,
            },
        }));
    };

    const increaseQty = () => {
        updateCartFields({
            total_quantity: formData.cart_item.total_quantity + 1,
        });
    };

    const decreaseQty = () => {
        if (formData.cart_item.total_quantity > 1) {
            updateCartFields({
                total_quantity: formData.cart_item.total_quantity - 1,
            });
        }
    };

    const addToCart = (e) => {
        e.preventDefault();
        addItemsToCart(formData);
    };

    const setIsMenuBoxOpen = (
        id = "",
        normal_price,
        discount_price,
        restaurant_id
    ) => {
        if (isMenuBoxOpen) {
            _setIsMenuBoxOpen(null);
            document.body.classList.remove("stop-scrolling");
        } else {
            _setIsMenuBoxOpen(id);
            updateCartFields({
                restaurant_id: parseInt(restaurant_id),
                menu_item_id: id,
                price: normal_price || discount_price,
            });
            document.body.classList.add("stop-scrolling");
        }
    };

    const setIsReviewModalOpen = () => {
        if (!isReviewModalOpen) {
            _setIsReviewModalOpen(!isReviewModalOpen);
            document.body.classList.add("stop-scrolling");
        } else {
            _setIsReviewModalOpen(!isReviewModalOpen);
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

    const directToCheckout = () => {
        navigate(`/checkout?goback=/menu/restaurant/${id}`);
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

        if (products?.data) {
            formattedCategories = Object.keys(products.data);
        }

        if (formattedCategories?.includes("Popular")) {
            let index = formattedCategories.indexOf("Popular");
            formattedCategories.splice(index, 1);
            formattedCategories.unshift("Popular");
        }

        return formattedCategories;
    }, [products]);

    window.addEventListener("click", function (e) {
        if (isMoreDetailsOpen) {
            if (!dropdown?.current.contains(e.target)) {
                setIsMoreDetailsOpen(false);
            }
        }
    });

    return (
        <div className="flex justify-between px-4 lg:px-8 pt-8 border-t border-t-gray-200 max-w-[1519.2px]">
            <Toaster />
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
                    {isReviewModalOpen && (
                        <ReviewsModalBox
                            setIsReviewModalOpen={setIsReviewModalOpen}
                        />
                    )}

                    {/* Store info modal box  */}
                    {isStoreInfoModalOpen && (
                        <StoreInfoModalBox
                            {...restaurant?.data}
                            setIsStoreInfoModalOpen={setIsStoreInfoModalOpen}
                        />
                    )}
                </div>
                <div className="flex items-center mb-3">
                    <h1 className="text-2xl font-bold mr-4">
                        {restaurant?.data.name}
                    </h1>
                    <div className="flex items-center mr-1">
                        <FaStar color="#ff9529" size={22} className="mr-1" />
                        <h1 className="text-base">
                            {restaurant?.data.reviews_avg_rating_star ??
                                "No rating yet"}
                        </h1>
                    </div>
                    <div className="text-base">
                        ({restaurant?.data.reviews_count})
                    </div>
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
                            {categories ? (
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
                            )}
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

                {!isLoading ? (
                    categories?.length !== 0 ? (
                        categories.map((category) => (
                            <div className="mb-12" id={category} key={category}>
                                <h1 className="mb-4 text-2xl font-bold">
                                    {category}
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {products?.data[category].map((product) => (
                                        product.quantity != 0 && (
                                            <MenuCard
                                            key={product.id}
                                            id={product.id}
                                            restaurant_id={id}
                                            imgSrc={product.image}
                                            imgName={product.name}
                                            title={product.name}
                                            normal_price={product.normal_price}
                                            discount_price={
                                                product.discount_price
                                            }
                                            Icon={FaShoppingCart}
                                            setIsMenuBoxOpen={setIsMenuBoxOpen}
                                        />
                                        )
                                    ))}
                                </div>
                                {isMenuBoxOpen && (
                                    <MenuDetailModalBox
                                        {...product?.data}
                                        formData={formData}
                                        setIsMenuBoxOpen={setIsMenuBoxOpen}
                                        isMenuBoxOpen={isMenuBoxOpen}
                                        updateCartFields={updateCartFields}
                                        addToCart={addToCart}
                                        increaseQty={increaseQty}
                                        decreaseQty={decreaseQty}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-2xl text-gray-500 font-semibold">
                            No menu items found
                        </div>
                    )
                ) : (
                    <div className="text-center text-2xl text-gray-500 font-semibold">
                        Loading ...
                    </div>
                )}
            </div>
            <div
                className="w-1/4 border border-slate-300 hidden xl:block
            h-[500px] self-start rounded-md sticky top-[80px] p-4 overflow-auto hideScrollbar"
            >
                <h1 className="text-xl font-bold">Cart items</h1>
                <div className="mt-5">
                    <p className="text-sm mb-2 font-bold text-gray-700">
                        Delivery address
                    </p>
                    <h1 className="text-lg font-bold mb-2 text-gray-700">
                        {userDetails?.data.address}
                    </h1>
                    <div className="flex items-center">
                        <CiClock2 className="mr-1" />
                        <p className="text-sm mr-3">35 mins</p>
                        <CiLocationOn className="mr-1" />
                        <p className="text-sm">2 kms</p>
                    </div>
                </div>

                {
                    cart_items?.data.length != 0 ? (
                        cart_items?.data[0].cart_items.map((cart_item) => (
                            <CartItem
                                key={cart_item.id}
                                {...cart_item}
                                destroyCartItem={destroyCartItem}
                            />
                        ))
                    ) : (
                        // <div className="text-center text-gray-700 text-semibold">No cart item</div>
                        <div>
                            <img src={noCartItem} alt="no-cart-item" />
                        </div>
                    )
                }

                <hr className="mt-8" />

                <div className="my-3">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-700 font-bold">Subtotal:</p>
                        <p className="font-bold text-gray-700">{subTotal?.toLocaleString()} MMK</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-700 font-bold">Delivery Fee:</p>
                        <p className="font-bold text-gray-700">1000 MMK</p>
                    </div>




                </div>

                <hr />

                <div className="flex items-center justify-between py-3">
                    <p className="text-gray-700 font-bold">Total:</p>
                    <p className="font-bold text-gray-700">{calculateTotal().toLocaleString()} MMK</p>
                </div>

                <button
                    type="button"
                    className="w-full bg-orange rounded-xl text-white
                    py-3 flex items-center justify-center"
                    onClick={directToCheckout}
                    disabled={cart_items?.data.length == 0  ? true : false}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default MenuPage;

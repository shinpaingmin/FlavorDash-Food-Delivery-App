import { FaLocationDot } from "react-icons/fa6";
import OrderBtn from "../../components/customer/CheckoutPage/OrderBtn";
import { useCallback, useEffect, useState } from "react";
import {
    useAddOrderItemsMutation,
    useGetCartItemsQuery,
    useGetPaymentDetailsQuery,
    useGetPromoCodesQuery,
    useGetUserDetailsQuery,
} from "../../services";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";

const INIT_DATA = {
    payment_id: "",
    promo_code_id: "",
    delivery_fee: 1000,
    contactless_delivery: 0,
};

const CheckoutPage = () => {
    const { data: promoCodes } = useGetPromoCodesQuery();
    const { data: userDetails, isLoading } = useGetUserDetailsQuery();
    const { data: cart_items, isLoading: itemsLoading } =
        useGetCartItemsQuery();
    const { data: payments } = useGetPaymentDetailsQuery();
    const [formData, setFormData] = useState(INIT_DATA);
    const [addOrderItems, { isSuccess, isError, error }] =
        useAddOrderItemsMutation();
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    console.log(formData)
    const subTotal = useMemo(() => {
        if (cart_items?.data.length != 0) {
            return cart_items?.data[0].cart_items.reduce(
                (acc, item) => acc + item.total_price,
                0
            );
        }
        return 0;
    }, [cart_items]);

    const discountPrice = useCallback(() => {
        const promo_code = promoCodes?.data.filter(
            (i) => i.id == formData.promo_code_id
        );
        return promo_code[0].discount_price.toString();
    }, [formData?.promo_code_id, promoCodes?.data]);

    const user = useMemo(
        () => ({
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
        }),
        [localStorage.getItem("name"), localStorage.getItem("email")]
    );

    function updateFields(fields) {
        setFormData((prev) => ({
            ...prev,
            ...fields,
        }));
    }

    const errorToastMessage = (message) => {
        toast.error(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#fecaca",
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/feed?status=orderSuccess");
        } else if (isError) {
            errorToastMessage(error?.data.message || error?.status);
        }
    }, [isSuccess, isError]);

    function handleContactless() {
        if (formData.contactless_delivery) {
            updateFields({ contactless_delivery: 0 });
        } else {
            updateFields({ contactless_delivery: 1 });
        }
    }

    const calculateTotal = useCallback(() => {
        if (formData.promo_code_id) {
            return Math.max(
                0,
                subTotal + 1000 - parseInt(discountPrice())
            ).toLocaleString();
        } else if (subTotal) {
            return (subTotal + 1000).toLocaleString();
        } else {
            return 0;
        }
    }, [formData?.promo_code_id, discountPrice, subTotal]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (confirm("Are you sure to place the order?")) {
            addOrderItems(formData);
        }
    };

    function goBack() {
        if (queryParams.get("goback")) {
            return queryParams.get("goback");
        } else {
            return "/feed"
        }
    }
    return (
        <div className="px-4 lg:px-8 pt-8 border-t border-t-gray-200 max-w-[1200px] mx-auto">
            <Link to={goBack()} className="flex mb-6 items-center w-max">
                <IoIosArrowBack />
                Back
            </Link>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col-reverse lg:flex-row"
            >
                <div className="w-full lg:w-[60%] shrink-0">
                    <Toaster />
                    <div className="relative lg:mb-6 lg:p-4 py-2 lg:shadow  mb-12 rounded-md  ">
                        <Link
                            className="absolute top-5 right-4 text-sm text-orange
                     hover:text-white hover:bg-orange rounded-full px-2 py-1 font-semibold"
                            to="/user/details?goback=/checkout"
                        >
                            Change
                        </Link>
                        <h1 className="text-gray-700 text-2xl font-bold">
                            Delivery address (*)
                        </h1>
                        <div className="flex mt-6">
                            <FaLocationDot className="text-gray-700" />
                            <div className="translate-y-[-5px] ml-2">
                                {isLoading ? (
                                    <div>Loading ...</div>
                                ) : (
                                    <>
                                        <p>{userDetails?.data.address}</p>
                                        <p>
                                            {userDetails?.data.detailed_address}
                                        </p>
                                    </>
                                )}

                                {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis expedita repellat repellendus.</p> */}
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="flex items-center">
                            <p className="mr-3">Contactless delivery</p>
                            <label className="switch ">
                                <input
                                    type="checkbox"
                                    value={formData.contactless_delivery}
                                    onChange={handleContactless}
                                />
                                <span className="slider round hover:bg-gray-400"></span>
                            </label>
                        </div>
                    </div>

                    <div className="relative lg:p-4 py-2 lg:shadow  mb-12 rounded-md lg:mb-6  ">
                        <Link
                            className="absolute top-5 right-4 text-orange
                     hover:text-white hover:bg-orange rounded-full px-4 font-semibold"
                            to="/user/details?goback=checkout"
                        >
                            Edit
                        </Link>
                        <h1 className="text-gray-700 text-2xl font-bold mb-6">
                            Personal Details (*)
                        </h1>
                        <p className="capitalize">{user.name}</p>
                        <p>{user.email}</p>
                        <p>{userDetails?.data.phone}</p>
                    </div>

                    <div className="lg:p-4 py-2 lg:shadow  mb-12 rounded-md lg:mb-6  ">
                        <h1 className="text-gray-700 text-2xl font-bold mb-6">
                            Payment
                        </h1>
                        <label htmlFor="payment" className="block mb-3">
                            Choose your favourite payment.
                        </label>
                        <select
                            id="payment"
                            value={formData.payment_id}
                            onChange={(e) =>
                                updateFields({ payment_id: e.target.value })
                            }
                            className="mb-3 px-4 outline-none border border-gray-300 py-2"
                            required
                        >
                            <option value="">
                                --- Select your payment ---
                            </option>
                            {payments?.data &&
                                payments.data.map((payment) => (
                                    <option key={payment.id} value={payment.id}>
                                        {payment.type}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <OrderBtn cart_items={cart_items} />
                </div>

                <div className="lg:ml-12 lg:p-4 py-2 lg:shadow  max-lg:mb-12 flex-auto lg:sticky lg:top-[80px] lg:self-start">
                    <h1 className="text-gray-700 text-2xl font-bold mb-2">
                        Your order slip
                    </h1>
                    <p className="text-sm mb-6">KFC chicken (hlaing)</p>
                    {itemsLoading ? (
                        <div>Loading ...</div>
                    ) : cart_items?.data.length != 0 ? (
                        cart_items?.data[0].cart_items.map((item) => (
                            <div
                                className="flex justify-between mb-3"
                                key={item.id}
                            >
                                <p className="text-pretty text-justify w-[70%]">
                                    {item.total_quantity} x{" "}
                                    {item.menu_item.name}
                                </p>
                                <p>{item.total_price.toLocaleString()} MMK</p>
                            </div>
                        ))
                    ) : (
                        <div>No cart items</div>
                    )}
                    <hr className="my-3" />
                    <div className="flex justify-between mb-3">
                        <p className="text-gray-700 font-bold">Subtotal</p>
                        <p className="text-gray-700 font-bold">
                            {subTotal?.toLocaleString()} MMK
                        </p>
                    </div>
                    <div className="flex justify-between mb-3">
                        <p className="text-gray-700 font-bold">Delivery fee</p>
                        <p className="text-gray-700 font-bold">1000 MMK</p>
                    </div>
                    {formData.promo_code_id && (
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-gray-700 font-bold">Discount:</p>
                            <p className="font-bold text-gray-700">
                                -{discountPrice()?.toLocaleString()} MMK
                            </p>
                        </div>
                    )}
                    <div
                        className="border-2 border-orange bg-[#f9ebd2] w-full h-20
                    my-6 p-3 rounded-xl flex items-center justify-between"
                    >
                        <p className="mr-2 text-sm">Save your money!</p>
                        <select
                            type="button"
                            className="bg-orange rounded-xl text-white px-4 py-3 flex items-center border-none outline-none w-40"
                            value={formData.promo_code_id}
                            onChange={(e) =>
                                updateFields({ promo_code_id: e.target.value })
                            }
                        >
                            <option value="">Apply coupon</option>
                            {promoCodes?.data ? (
                                promoCodes.data.map((code) => (
                                    <option value={code.id} key={code.id}>
                                        {code.promo_code}
                                    </option>
                                ))
                            ) : (
                                <div>No promo codes</div>
                            )}
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700 text-2xl font-bold">
                            Total
                        </p>
                        <p className="text-gray-700 text-2xl font-bold">
                            {calculateTotal()} MMK
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;

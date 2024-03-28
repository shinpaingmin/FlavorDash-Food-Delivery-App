const OrderBtn = ({ cart_items }) => {
    return (
        <button
            className="w-full px-4 py-3.5 mt-8 rounded-md bg-orange text-white hover:bg-orange/95"
            type="submit"
            disabled={cart_items?.data.length == 0 ? true : false}

        >
            Place order
        </button>
    );
};

export default OrderBtn;

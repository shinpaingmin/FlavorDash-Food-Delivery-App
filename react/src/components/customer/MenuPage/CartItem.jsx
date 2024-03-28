import { MdDelete } from "react-icons/md";

const CartItem = ({
    destroyCartItem,
    id,
    menu_item,
    total_price,
    total_quantity,
}) => {

    return (
        <div className="w-full h-24 border overflow-hidden border-gray-300 my-5 rounded-xl flex items-start justify-between">
            <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                <img
                    src={`http://localhost:8000/storage/${menu_item?.image}`}
                    alt="item"
                    className="rounded-xl object-cover object-center w-full h-full"
                />
            </div>
            <div className="p-3 overflow-hidden ">
                <h2
                    className="overflow-hidden text-ellipsis
                         text-nowrap whitespace-nowrap text-sm"
                >
                    <span className="font-bold text-gray-700">
                        {menu_item?.name}
                    </span>
                </h2>

                <div className="flex items-center justify-between mt-4">

                    <p className="mr-2 text-sm font-bold text-gray-700">{total_quantity}</p>
                    <p className="font-bold text-gray-700">x</p>
                    <p className="font-bold ml-2 text-gray-700">{total_price} MMK</p>
                </div>
            </div>
            <button type="button"
                className="bg-orange w-16 h-full flex justify-center items-center transition-all hover:bg-orange/90"
                onClick={() => destroyCartItem(id)}
            >
                <MdDelete size={24} color="#fff" />
            </button>
        </div>
    );
};

export default CartItem;

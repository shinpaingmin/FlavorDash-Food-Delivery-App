import { FaLocationDot } from "react-icons/fa6";

const CheckoutPage = () => {
  return (
    <div className="flex px-4 lg:px-8 pt-8 border-t border-t-gray-200 max-w-[1519.2px]">
        <div className='w-2/3'>
            <div className="relative mb-6 p-4 shadow rounded-md  ">
                <button className='absolute top-5 right-4'>Change</button>
                <h1 className='text-gray-700 text-2xl font-bold'>Delivery address</h1>
                <div className="flex mt-6">
                    <FaLocationDot className="text-gray-700" />
                    <div className="translate-y-[-5px] ml-2">
                        <p>2 Oakkyin Butaryone Street, Hlaing</p>
                        <p>Yangon</p>
                        <p>Floor: Ground floor</p>
                        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis expedita repellat repellendus.</p> */}
                    </div>
                </div>
                <hr className="my-5" />
                <div className="flex items-center">
                    <p className="mr-3">Contactless delivery</p>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>

            <div className=" mb-6 p-4 shadow rounded-md  ">
                <h1 className='text-gray-700 text-2xl font-bold mb-6'>Delivery time</h1>
                <div className="flex">
                    <input type="date" className="border p-2 rounded-md border-gray-300 w-1/2" />
                    <input type="time" className="border p-2 rounded-md border-gray-300 ml-3 flex-auto" />
                </div>
            </div>

            <div className="relative p-4 shadow rounded-md  ">
                <button className='absolute top-5 right-4'>Edit</button>
                <h1 className='text-gray-700 text-2xl font-bold mb-6'>Personal Details</h1>
                <p>Shin Paing Min</p>
                <p>shinpaingmin@gmail.com</p>
                <p>+959 794219842</p>
            </div>
        </div>
        <div className='ml-12 p-4 shadow flex-auto sticky top-[80px] self-start'>
            <h1 className='text-gray-700 text-2xl font-bold mb-6'>Your order slip</h1>
        </div>
    </div>
  )
}

export default CheckoutPage

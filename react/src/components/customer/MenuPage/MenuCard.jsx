const MenuCard = ({ id, restaurant_id, imgSrc, imgName, title, normal_price, discount_price, Icon, setIsMenuBoxOpen }) => {
  return (
    <div className='w-full md:w-80 hover:shadow-lg rounded-md cursor-pointer border border-slate-300'
        onClick={() => setIsMenuBoxOpen(id, normal_price, discount_price, restaurant_id)}
    >
        <div className='w-full h-48 overflow-hidden relative'>
            <img src={`http://localhost:8000/storage/${imgSrc}`} alt={imgName}
            className='w-full h-full object-cover object-center rounded-t-md bg-gray-300' />
            <div className="absolute top-2 right-2  cursor-pointer
                w-8 h-8 rounded-full bg-white z-[1] grid place-items-center hover:scale-110 transition-all"

            >
                    <Icon className="text-orange" />
            </div>
        </div>
        <div className='p-4'>
            <h2 className='font-semibold text-nowrap text-ellipsis  w-full overflow-hidden'>{title}</h2>
            <div className="flex items-center  mt-2">
                {
                    discount_price && (
                        <del className="text-gray-700 font-semibold text-sm mr-3">{discount_price.toLocaleString()} MMK</del>
                    )
                }
                <p className='text-gray-700 font-semibold text-sm'>{normal_price.toLocaleString()} MMK</p>
            </div>
        </div>
    </div>
  )
}

export default MenuCard

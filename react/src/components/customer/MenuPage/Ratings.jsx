

const Ratings = ({ rating, percent, FaStar }) => {
  return (
    <div className="flex items-center mb-4">
        <div className="flex items-center">
            <FaStar color="#ff9529" />
            <p className="text-gray-600 text-sm font-semibold ml-1">{rating}</p>
        </div>
        <div className="mx-2 bg-[#efefef] w-full h-3 rounded-full ">
            <div className={`w-[${percent}] h-full bg-[#ff9529] rounded-full`}></div>
        </div>
        <div className="text-gray-600 text-sm font-semibold">{percent}</div>
    </div>
  )
}

export default Ratings

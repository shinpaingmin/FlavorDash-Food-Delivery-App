

const ReviewBox = ({ FaStar, FaStarHalfAlt }) => {
  return (
    <div className="p-4 border border-gray-300 mt-8 rounded-xl">
        <h1 className="text-lg text-gray-700 font-semibold">Shin</h1>
        <p className="text-gray-600 font-semibold text-xs">Yesterday</p>
        <div className="flex items-center mt-2">
            <div className="flex items-center">
                <FaStar color="#ff9529" />
                <FaStar color="#ff9529" />
                <FaStar color="#ff9529" />
                <FaStar color="#ff9529" />
                <FaStarHalfAlt color="#ff9529" />
            </div>
            <p className="text-gray-600 font-semibold text-sm ml-3">(Fried chicken)</p>
        </div>
        <p className="mt-3 text-gray-700 font-semibold">So tasty!</p>
    </div>
  )
}

export default ReviewBox

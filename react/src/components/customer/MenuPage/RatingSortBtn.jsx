const RatingSortBtn = ({ sortOption }) => {
  return (
    <button
        className="rounded-full py-2 px-3 border border-gray-300 hover:bg-orange
                    hover:text-white text-sm focus:bg-orange focus:text-white font-semibold mr-5"
        type="button"
    >
        {sortOption}
    </button>
  )
}

export default RatingSortBtn

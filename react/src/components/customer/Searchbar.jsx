import { IoFastFoodSharp } from "react-icons/io5";
import { LuLocateFixed } from "react-icons/lu";

const Searchbar = ({ searchTownship, setSearchTownship, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="flex justify-between max-md:items-center
                    flex-col md:flex-row">
        <div className="flex w-full md:w-3/4 h-14 bg-white items-center
                        rounded-2xl border border-slate-300 md:p-2 max-md:mb-14">

            <input type="text" className="px-4 text-sm border-none focus:outline-none focus:ring-0 flex-1"
                placeholder="Search townships in Yangon" required value={searchTownship} onChange={(e) => setSearchTownship(e.target.value)} />

            <button type="button" className="flex items-center pr-4 text-orange h-full">
                <LuLocateFixed className="mr-2" /> <span className="max-md:text-sm">Locate Me</span>
            </button>

        </div>

        <button type="submit" className="flex items-center px-4  py-4 md:py-2
                                        bg-orange text-white rounded-md max-md:w-max">
            <IoFastFoodSharp size={20} className="mr-2" /> <span className="max-md:text-sm">Find Food</span>
        </button>
    </form>
  )
}

export default Searchbar

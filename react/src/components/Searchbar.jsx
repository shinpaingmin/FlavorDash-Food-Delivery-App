import { IoFastFoodSharp } from "react-icons/io5";
import { LuLocateFixed } from "react-icons/lu";

const Searchbar = () => {
  return (
    <form className="flex justify-between">
        <div className="flex w-3/4 h-14 bg-white items-center rounded-2xl border border-slate-300 p-2">
            <input type="text" className="px-4 text-sm border-none focus:outline-none focus:ring-0 flex-1"
                placeholder="Search locations in Yangon (eg. Hlaing)" />
            <button type="button" className="flex items-center pr-4 text-orange h-full">
                <LuLocateFixed className="mr-2" /> Locate Me
            </button>
        </div>
        <button type="submit" className="flex items-center px-4 py-2 bg-orange text-white rounded-md">
            <IoFastFoodSharp className="mr-2" /> Find Food
        </button>
    </form>
  )
}

export default Searchbar

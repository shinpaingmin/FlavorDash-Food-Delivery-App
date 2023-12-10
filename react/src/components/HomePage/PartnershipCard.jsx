import Button from "../Button"
import { FaArrowRight } from "react-icons/fa";

const PartnershipCard = ( { imgSrc, imgOrder, containerOrder, desc, children } ) => {
  return (
    <div className="grid grid-cols-2 px-8 my-40">
        <div className={`w-full h-96 object-cover ${imgOrder}`}>
            <img src={imgSrc} alt="" className="w-full h-full" />
        </div>
        <div className={`px-4 ${containerOrder}`}>
            <h1 className="text-4xl font-bold">
                { children }
            </h1>
            <h1 className="text-4xl font-bold mb-8">& anywhere</h1>
            <p className="mb-8">{ desc }</p>
            <Button bgColor="bg-orange"
                    textColor="text-white"
                    border="">
                Register <FaArrowRight className="ml-2 animate-pulse"/>
            </Button>
        </div>
    </div>
  )
}

export default PartnershipCard

import ServiceCard from "./ServiceCard"
import { FaTruckFast } from "react-icons/fa6"
import { MdTimer } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Intro = () => {
  return (
    <section className="px-8 my-20 md:mt-32 md:mb-40">
        <div className="flex flex-col justify-center text-center mb-16">
            <h3 className="text-orange font-semibold mb-3">What we serve</h3>
            <h1 className="font-bold text-2xl tracking-wide">Just sit back at home</h1>
            <h1 className="font-bold text-2xl mb-3">we will <span className="text-orange">take care</span></h1>
            <p className="text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <p className="text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
        <div className="block lg:grid lg:grid-cols-3 lg:gap-20">
            <ServiceCard Icon={FaTruckFast} size={40}
                        title="Fast Delivery" desc="something..." />
            <ServiceCard Icon={ MdTimer } size={40}
                        title="Punctual Service" desc="something..." />
            <ServiceCard Icon={RiMoneyDollarCircleFill } size={40}
                        title="100% Secure Checkout" desc="something..." />
        </div>
    </section>
  )
}

export default Intro

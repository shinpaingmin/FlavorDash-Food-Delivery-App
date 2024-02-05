import { mainPic } from "../../assets/images"
import Hero from "../../components/customer/HomePage/Hero"
import Intro from "../../components/customer/HomePage/Intro"
import Location from "../../components/customer/HomePage/Location"
import Partnership from "../../components/customer/HomePage/Partnership"

const HomePage = () => {



  return (
    <>
        <div className="w-full md:h-[50vh] absolute z-[-10] top-0 left-0
                        overflow-hidden max-md:object-cover">
            <img src={mainPic} alt="food" className="w-full max-md:h-full hidden md:block"/>
        </div>

        <Hero />
        <Intro />
        <Partnership />
        <Location />

    </>
  )
}

export default HomePage

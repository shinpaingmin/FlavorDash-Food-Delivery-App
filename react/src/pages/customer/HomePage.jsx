import { mainPic } from "../../assets/images"
import Hero from "../../components/HomePage/Hero"
import Intro from "../../components/HomePage/Intro"
import Location from "../../components/HomePage/Location"
import Partnership from "../../components/HomePage/Partnership"

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

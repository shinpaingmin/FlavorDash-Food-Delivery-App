import { mainPic } from "../assets/images"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/HomePage/Hero"
import Intro from "../components/HomePage/Intro"
import Location from "../components/HomePage/Location"
import Partnership from "../components/HomePage/Partnership"

const HomePage = () => {
  return (
    <>
        <div className="absolute z-[-10] top-0 left-0 w-full h-[50vh] overflow-hidden">
            <img src={mainPic} alt="food" className="w-full "/>
        </div>
        <Header />
        <Hero />
        <Intro />
        <Partnership />
        <Location />
        <Footer />
    </>
  )
}

export default HomePage

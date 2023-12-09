import { mainPic } from "../assets/images"
import Header from "../components/Header"
import Hero from "../components/HomePage/Hero"

const HomePage = () => {
  return (
    <>
        <div className="absolute z-[-10] top-0 left-0 w-full h-[50vh] overflow-hidden">
            <img src={mainPic} alt="food" className="w-full "/>
        </div>
        <Header />
        <Hero />
    </>
  )
}

export default HomePage

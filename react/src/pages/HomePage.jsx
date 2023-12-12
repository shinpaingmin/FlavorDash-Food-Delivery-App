import { useState } from "react";
import { mainPic } from "../assets/images"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/HomePage/Hero"
import Intro from "../components/HomePage/Intro"
import Location from "../components/HomePage/Location"
import Partnership from "../components/HomePage/Partnership"

const HomePage = () => {

    const [open, setOpen] = useState(false);

  return (
    <main className={`${open && "stop-scrolling"}`}>
        <div className="w-full md:h-[50vh] h-[100vh] absolute z-[-10] top-0 left-0
                        overflow-hidden max-md:object-cover">
            <img src={mainPic} alt="food" className="w-full max-md:h-full"/>
        </div>
        <Header open={open} setOpen={setOpen} />
        <Hero />
        <Intro />
        <Partnership />
        <Location />
        <Footer />
    </main>
  )
}

export default HomePage

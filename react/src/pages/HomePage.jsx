import { useEffect, useState } from "react";
import { mainPic } from "../assets/images"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/HomePage/Hero"
import Intro from "../components/HomePage/Intro"
import Location from "../components/HomePage/Location"
import Partnership from "../components/HomePage/Partnership"

const HomePage = () => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        open && document.body.classList.add('stop-scrolling');
        !open && document.body.classList.remove('stop-scrolling');
    }, [open])

  return (
    <>
        <div className="w-full md:h-[50vh] absolute z-[-10] top-0 left-0
                        overflow-hidden max-md:object-cover">
            <img src={mainPic} alt="food" className="w-full max-md:h-full hidden md:block"/>
        </div>
        <Header open={open} setOpen={setOpen} />
        <Hero />
        <Intro />
        <Partnership />
        <Location />
        <Footer />
    </>
  )
}

export default HomePage

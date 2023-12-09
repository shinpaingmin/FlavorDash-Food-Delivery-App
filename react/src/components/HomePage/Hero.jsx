import { pizza, burger, dumpling, noodle } from "../../assets/images"
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiDumpling, GiNoodles  } from "react-icons/gi";
import Searchbar from "../Searchbar"
import Card from "./Card"


const Hero = () => {
  return (
    <>
        <section className="px-8 pt-12 pb-24  opacity-9 relative">
            <div className="flex justify-center w-full mb-16">
                <div className="w-1/2 ">
                    <h1 className="text-5xl mb-10 text-center font-medium">Find Restaurants Near You!</h1>
                    <Searchbar />
                </div>
            </div>

        </section>
        <div className="grid grid-cols-4 px-8">
                <Card imgSrc={pizza} title="Pizza Passion"
                        desc="Melted cheesy bliss in every slice. Taste the joy!" margin="mr-10"
                        Icon={FaPizzaSlice}
                        lazyLoadingHash="LYI:j]0h9a%0}@NHI;f$E3$%oeR+" />
                <Card imgSrc={burger} title="Burger Symphony"
                        desc="Juicy harmonies of flavors that sing in every bite" margin="mr-10"
                        Icon={FaHamburger}
                        lazyLoadingHash="L6D+3b~302M{0V03bv-U4[v#~TSz" />
                <Card imgSrc={dumpling} title="Dumpling Elegance"
                        desc="Pockets of joy crafted with love, an artful delight" margin="mr-10"
                        Icon={GiDumpling}
                        lazyLoadingHash="LDKAl@9H~U9b_Kn6S_S10L9GX7Io" />
                <Card imgSrc={noodle} title="Noodle Nirvana"
                        desc="Silken strands of delight that redefine satisfaction" margin="mr-10"
                        Icon={GiNoodles }
                        lazyLoadingHash="LBLzEL5PKkD49D-j-lV?*0-mH=_3" />
        </div>
    </>
  )
}

export default Hero

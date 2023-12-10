import Searchbar from "../Searchbar"
import MenuCard from "./MenuCard"
import { menu } from "../../constants/menuData";


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
        <div className="grid grid-cols-4 gap-10 px-8">
            {
                menu.map((item) => (
                    <MenuCard  key={item.id}
                        imgSrc={item.img}
                        title={item.title}
                        desc={item.desc}
                        Icon={item.icon}
                        lazyLoadingHash={item.lazyLoadingHash}
                        calories={item.calories}
                        price={item.price} />
                ))
            }
        </div>
    </>
  )
}

export default Hero

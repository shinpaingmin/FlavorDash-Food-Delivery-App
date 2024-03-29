import Searchbar from "../Searchbar";
import MenuCard from "./MenuCard";
import { menu } from "../../../constants/menuData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const[searchTownship, setSearchTownship] = useState("");
    const navigate = useNavigate();

    const onSearch = (e) => {
        e.preventDefault();
        navigate(`/feed/new?searchTownship=${searchTownship}`);
    };

    return (
        <>
            <section
                className="px-2 pt-32 md:pt-12 pb-24 xl:px-8
                             opacity-9 relative"
            >
                <div className="flex justify-center w-full mb-16">
                    <div className="w-full md:w-3/4 xl:w-1/2">
                        <h1 className="text-4xl lg:text-5xl mb-10 text-center font-medium">
                            Find Restaurants Near You!
                        </h1>
                        <Searchbar searchTownship={searchTownship} setSearchTownship={setSearchTownship} onSearch={onSearch} />
                    </div>
                </div>
            </section>
            <div className="block md:grid md:grid-cols-2 xl:grid-cols-4  md:gap-10 px-8">
                {menu.map((item) => (
                    <MenuCard
                        key={item.id}
                        imgSrc={item.img}
                        title={item.title}
                        desc={item.desc}
                        Icon={item.icon}
                        lazyLoadingHash={item.lazyLoadingHash}
                        calories={item.calories}
                        price={item.price}
                    />
                ))}
            </div>
        </>
    );
};

export default Hero;

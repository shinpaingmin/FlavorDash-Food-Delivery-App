import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiDumpling, GiNoodles  } from "react-icons/gi";
import { pizza, burger, dumpling, noodle } from "../assets/images"

export const menu = [
    {
        id: 1,
        icon: FaPizzaSlice,
        title: "Pizza Passion",
        desc: "Melted cheesy bliss in every slice. Taste the joy!",
        img: pizza,
        calories: "~ 250",
        price: "20000-50000",
        lazyLoadingHash: "LYI:j]0h9a%0}@NHI;f$E3$%oeR+"
    },

    {
        id: 2,
        icon: FaHamburger,
        title: "Burger Symphony",
        desc: "Juicy harmonies of flavors that sing in every bite",
        img: burger,
        calories: "~ 520",
        price: "8000-15000",
        lazyLoadingHash: "L6D+3b~302M{0V03bv-U4[v#~TSz"
    },

    {
        id: 3,
        icon: GiDumpling,
        title: "Dumpling Elegance",
        desc: "Pockets of joy crafted with love, an artful delight",
        img: dumpling,
        calories: "~ 80",
        price: "6000-12000",
        lazyLoadingHash: "LDKAl@9H~U9b_Kn6S_S10L9GX7Io"
    },

    {
        id: 4,
        icon: GiNoodles,
        title: "Noodle Nirvana",
        desc: "Silken strands of delight that redefine satisfaction",
        img: noodle,
        calories: "~ 138",
        price: "7000-15000",
        lazyLoadingHash: "LBLzEL5PKkD49D-j-lV?*0-mH=_3"
    }
]

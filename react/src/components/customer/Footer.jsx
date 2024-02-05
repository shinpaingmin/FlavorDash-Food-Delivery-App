import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { FaInstagram, FaLocationDot, FaPhone } from "react-icons/fa6";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  return (
    <div className="mt-20 md:mt-40 w-full min-h-80 bg-orange  p-8">
        <div className="block md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8">
            <div className="max-md:mb-5">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                <ul className="list-none">
                    <li className="flex items-center mb-3">
                        <FaLocationDot className="mr-2" /> No.123 Main Street, Yangon, Myanmar
                    </li>
                    <li className="flex items-center mb-3">
                        <FaPhone className="mr-2" />
                        <Link>+959 xxxxxxxxx</Link>
                    </li>
                    <li className="flex items-center mb-6">
                        <FaEnvelope className="mr-2" />
                        <Link>FlavorDash@mybusiness.com</Link>
                    </li>
                    <li className="flex items-center">
                        <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
                            <SocialMedia Icon={FaTwitter} size={24} color="text-black" bgColor="bg-white" padding="p-3" />
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
                            <SocialMedia Icon={FaFacebookF} size={24} color="text-black" bgColor="bg-white" padding="p-3" />
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
                            <SocialMedia Icon={FaInstagram} size={24} color="text-black" bgColor="bg-white" padding="p-3" />
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
                            <SocialMedia Icon={FaLinkedinIn} size={24} color="text-black" bgColor="bg-white" padding="p-3" />
                        </motion.div>
                    </li>
                </ul>
            </div>
            <div className="max-md:mb-5">
                <h1 className="text-2xl font-bold mb-4">Popular Places</h1>
                <ul className="list-none">
                    <li className="mb-5"><Link> Hlaing Township </Link></li>
                    <li className="mb-5"><Link> Insein Township </Link></li>
                    <li className="mb-5"><Link> Mayangon Township </Link></li>
                    <li className="mb-5"><Link> Kamayut Township </Link></li>
                    <li className="mb-5"><Link> Sanchaung Township </Link></li>
                </ul>
            </div>
            <div className="max-md:mb-5">
                <h1 className="text-2xl font-bold mb-4">Info Links</h1>
                <ul className="list-none">
                    <li className="mb-5"><Link> Get Help </Link></li>
                    <li className="mb-5"><Link> Buy Gift Cards </Link></li>
                    <li className="mb-5"><Link> Add Your Restaurant </Link></li>
                    <li className="mb-5"><Link> Register for Riders </Link></li>
                    <li className="mb-5"><Link> Promotion Vounchers </Link></li>
                </ul>
            </div>
            <div className="max-md:mb-5">
                <ul className="list-none">
                    <li className="mb-5"><Link> Restaurants Near Me </Link></li>
                    <li className="mb-5"><Link> Privacy Policy </Link></li>
                    <li className="mb-5"><Link> Terms & Conditions </Link></li>
                    <li className="mb-5"><Link> About Us </Link></li>
                    <li className="mb-5"><p className="font-bold">Daily Service at 9AM - 5PM</p></li>
                </ul>
            </div>
        </div>

        <hr className="my-10" />

        <div className="grid place-items-center">
            <p className="font-bold">&copy; 2023 FlavorDash Food Delivery Service | Designed & Developed by Shin Paing Min</p>
        </div>
    </div>
  )
}

export default Footer

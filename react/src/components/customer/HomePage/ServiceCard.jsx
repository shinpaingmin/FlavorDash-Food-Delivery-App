import { motion } from "framer-motion";

const ServiceCard = ({ Icon, size, title }) => {
  return (
    <motion.div className="grid place-items-center
                    border border-transparent
                    hover:border-gray-200 hover:shadow-sm cursor-pointer pt-5 max-lg:mb-8"
            whileHover={{ y: -10 }}
                  >

        <div className="w-max rounded-full p-5 bg-orange
                        ">
            <Icon size={size} className='text-white' />
        </div>

        <div className="text-center p-6">
            <h1 className="text-lg font-semibold mb-3">{ title }</h1>
            <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, molestiae.</p>
        </div>
    </motion.div>
  )
}

export default ServiceCard

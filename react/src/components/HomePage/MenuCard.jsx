/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Blurhash } from "react-blurhash";

const MenuCard = ({ imgSrc, title, desc, Icon, lazyLoadingHash, calories, price }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();

        img.onload = () => {
            setImageLoaded(true);
        }

        img.src = imgSrc;

    }, [imgSrc])

  return (
    <>

        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className={`max-w-sm bg-white border border-gray-200  rounded-lg shadow cursor-pointer hover:shadow-md`} >

            <div className="w-full h-48 object-cover">
                {
                    imageLoaded ? (
                        <img src={imgSrc} alt="Pizza" className="w-full h-full rounded-t-lg" />
                    )
                    :
                    (
                        <Blurhash
                            hash={lazyLoadingHash}
                            width="100%"
                            height="100%"
                            resolutionX={32}
                            resolutionY={32}
                            punch={1}
                        />
                    )
                }
            </div>


            <div className="p-4 bg-white">
                <h1 className="flex items-center text-lg font-bold mb-2"> < Icon className="mr-2" /> { title } </h1>
                <p className='mb-2'>{ desc }</p>
                <hr className='my-3' />
                <div className='flex justify-between'>
                    <span>{ calories } calories</span>
                    <span>{ price } MMK</span>
                </div>
            </div>
        </motion.div>

    </>
  )
}

export default MenuCard

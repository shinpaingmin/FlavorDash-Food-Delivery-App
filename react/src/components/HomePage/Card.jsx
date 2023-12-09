import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Blurhash } from "react-blurhash";

const Card = ({ imgSrc, title, desc, margin, Icon, lazyLoadingHash }) => {
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
            whileHover={{ scale: 1.1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className={`max-w-sm bg-white border border-gray-200  rounded-lg shadow cursor-pointer hover:shadow-md ${margin}`} >

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


            <div className="p-4 bg-white opacity-70">
            <h1 className="flex items-center text-xl font-bold mb-2"> < Icon className="mr-2" /> { title } </h1>
            <p className='mb-2'>{ desc }</p>
            <span>40 calories</span>
            <span>2 person</span>
            <hr />
            <span>20000 MMK</span>
            <button>+</button>
            </div>
        </motion.div>

    </>
  )
}

export default Card

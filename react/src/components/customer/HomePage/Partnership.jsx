import { delivery, restaurant } from "../../../assets/images"
import PartnershipCard from "./PartnershipCard";


const Partnership = () => {
  return (
    <section className="">
        <PartnershipCard imgSrc={restaurant}
                        imgOrder="order-1"
                        containerOrder="order-2"
                        desc="Welcome, esteemed restaurant owners! Join our culinary community by registering your restaurant with us. By becoming a part of our food delivery platform, you unlock the opportunity to reach a broader audience and delight customers with your delectable dishes. Showcase your culinary expertise, expand your business, and elevate the dining experience for customers in the comfort of their homes.">
            <span className="text-orange">Partner</span> with <span className="text-orange">Us</span> anytime
        </PartnershipCard>

        <PartnershipCard imgSrc={delivery}
                        imgOrder="order-2"
                        containerOrder="order-1"
                        desc="Calling all delivery service providers! Join our network and deliver satisfaction anytime, anywhere. Register your delivery service to connect with a broader audience, ensuring timely and convenient deliveries. Take the plunge into becoming a valued part of our platform by completing the registration process below. Start delivering satisfaction with us!">
            <span className="text-orange">Deliver</span> with <span className="text-orange">Us</span> anytime
        </PartnershipCard>
    </section>
  )
}

export default Partnership

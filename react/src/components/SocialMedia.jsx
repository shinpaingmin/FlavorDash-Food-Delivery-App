import { Link } from "react-router-dom"

const SocialMedia = ({ Icon, size, color, bgColor, padding }) => {
  return (
    <div className={`rounded-full mr-3 ${padding} ${bgColor}`}>
        <Link><Icon size={size} className={`${color}`}/></Link>
    </div>
  )
}

export default SocialMedia

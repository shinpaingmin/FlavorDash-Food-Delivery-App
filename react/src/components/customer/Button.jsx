import { Link } from 'react-router-dom';

const Button = ({ bgColor, textColor, border, href, children }) => {
  return (
    <Link   className={`flex items-center px-4 py-2 rounded-full
                     w-max ${bgColor} ${textColor} ${border} `}

            to={href}
    >
        { children ?? '' }
    </Link>
  )
}

export default Button

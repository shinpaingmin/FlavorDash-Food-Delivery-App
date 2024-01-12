import { Link } from 'react-router-dom';

const Button = ({ bgColor, textColor, border, children }) => {
  return (
    <Link   className={`flex items-center px-4 py-2 rounded-full
                     w-max ${bgColor} ${textColor} ${border} `}

            to="/login"
    >
        { children ?? '' }
    </Link>
  )
}

export default Button

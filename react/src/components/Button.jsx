import { Link } from 'react-router-dom';

const Button = ({ bgColor, textColor, border, to, children }) => {
  return (
    <Link   className={`flex items-center px-4 py-2 rounded-full
                     w-max ${bgColor} ${textColor} ${border} `}

            to={to}
    >
        { children ?? '' }
    </Link>
  )
}

export default Button



const HamburgerMenu = ({ open, setOpen }) => {



    return (
        <button type='button' className="hamburger block lg:hidden " onClick={() => setOpen(!open)}>
                <span className={`${open && "open"} hamburger-top `}></span>
                <span className={`${open && "open"} hamburger-middle `}></span>
                <span className={`${open && "open"} hamburger-bottom `}></span>
        </button>
    )
}

export default HamburgerMenu

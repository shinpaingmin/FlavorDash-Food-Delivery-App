import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "../components/customer/Header"
import Footer from "../components/customer/Footer"

const CustomerLayout = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        open && document.body.classList.add('stop-scrolling');
        !open && document.body.classList.remove('stop-scrolling');
    }, [open]);

    return (
        <>
            <Header open={open} setOpen={setOpen} />
                <Outlet />
            <Footer />
        </>

    )
}

export default CustomerLayout

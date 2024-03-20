import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/customer/Header";
import Footer from "../components/customer/Footer";

const GuestLayout = () => {
    const [open, setOpen] = useState(false);

    if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") != "null" &&
        localStorage.getItem("role") === "user"
    ) {
        return <Navigate to="/feed" />;
    } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") != "null" &&
        localStorage.getItem("role") === "admin"
    ) {
        return <Navigate to="/dashboard" />;
    }

    useEffect(() => {
        open && document.body.classList.add("stop-scrolling");
        !open && document.body.classList.remove("stop-scrolling");
    }, [open]);

    return (
        <>
            <Header open={open} setOpen={setOpen} />
            <Outlet />
            <Footer />
        </>
    );
};

export default GuestLayout;

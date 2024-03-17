import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/customer/Header";
import Footer from "../components/customer/Footer";
import {
    useCheckEmailVerifyQuery,
    useGetRegenerateEmailVerifyQuery,
} from "../services";
import VerifyBox from "../components/customer/VerifyBox";
import toast, { Toaster } from "react-hot-toast";

const CustomerLayout = () => {
    const [open, setOpen] = useState(false);
    const [isCloseVerifyBox, setIsCloseVerifyBox] = useState(true);
    const [triggerQuery, setTriggerQuery] = useState(false);
    const { data, isSuccess, isError } = useCheckEmailVerifyQuery();
    const { isSuccess: resendSuccess, isError: resendError } =
        useGetRegenerateEmailVerifyQuery(triggerQuery, {
            // skip if the link is not clicked
            skip: triggerQuery === false,
        });

    if (
        !localStorage.getItem("token") ||
        localStorage.getItem("role") !== "user"
    ) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        // if (
        //     isError?.status == 403 ||
        //     isError?.status == 401 ||
        //     resendError?.status == 403 ||
        //     resendError?.status == 401
        // ) {
        //     localStorage.clear();
        //     return <Navigate to="/login" />;
        // }

        if (isSuccess && data?.status === "not verified") {
            setIsCloseVerifyBox(false);
        } else if (isSuccess && data?.status === "verified") {
            setIsCloseVerifyBox(true);
        }

        if (triggerQuery) {
            setTriggerQuery(false);
        }

        open && document.body.classList.add("stop-scrolling");
        !open && document.body.classList.remove("stop-scrolling");
    }, [open, isSuccess, triggerQuery, isError, resendError]);

    function onClick() {
        setTriggerQuery(true);
        toast.success("Email verify link was sent!", {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });
    }

    return (
        <>
            {triggerQuery && <Toaster />}
            {!isCloseVerifyBox && (
                <VerifyBox
                    setIsCloseVerifyBox={setIsCloseVerifyBox}
                    onClick={onClick}
                />
            )}
            <Header open={open} setOpen={setOpen} />
            <Outlet />
            <Footer />
        </>
    );
};

export default CustomerLayout;

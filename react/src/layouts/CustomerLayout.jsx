import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/customer/Header";
import Footer from "../components/customer/Footer";
import {
    useCheckEmailVerifyQuery,
    useGetRegenerateEmailVerifyQuery,
} from "../services";
import VerifyBox from "../components/customer/VerifyBox";

const CustomerLayout = () => {
    const [open, setOpen] = useState(false);
    const [isCloseVerifyBox, setIsCloseVerifyBox] = useState(true);
    const [triggerQuery, setTriggerQuery] = useState(false);
    const { data, isSuccess, isError, error } = useCheckEmailVerifyQuery();
    const { data: resend } = useGetRegenerateEmailVerifyQuery(triggerQuery, {
        // skip if the link is not clicked
        skip: triggerQuery === false,
    });

    console.log(resend);
    if (
        !localStorage.getItem("token") ||
        localStorage.getItem("role") !== "user"
    ) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        if (isSuccess && data?.status == "not verified") {
            setIsCloseVerifyBox(false);
        } else if (isSuccess && data?.status == "verified") {
            setIsCloseVerifyBox(true);
        }

        if (triggerQuery) {
            setTriggerQuery(false);
        }

        open && document.body.classList.add("stop-scrolling");
        !open && document.body.classList.remove("stop-scrolling");
    }, [open, isSuccess, triggerQuery]);

    return (
        <>
            {!isCloseVerifyBox && (
                <VerifyBox
                    setIsCloseVerifyBox={setIsCloseVerifyBox}
                    setTriggerQuery={setTriggerQuery}
                />
            )}
            <Header open={open} setOpen={setOpen} />
            <Outlet />
            <Footer />
        </>
    );
};

export default CustomerLayout;

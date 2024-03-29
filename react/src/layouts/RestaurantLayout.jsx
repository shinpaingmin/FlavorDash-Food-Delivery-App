import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/restaurant/Navbar";
import Sidebar from "../components/restaurant/Sidebar";
import { CssBaseline } from "@mui/material";
import { useGetAdminRestaurantQuery } from "../services";


const RestaurantLayout = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)"); // return true to desktop screen
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { data: resData } = useGetAdminRestaurantQuery();
    // Fetch User Info here with RTK

    if (
        !localStorage.getItem("token") ||
        localStorage.getItem("token") == "null" ||
        localStorage.getItem("role") !== "admin"

    ) {
        localStorage.clear();
        return <Navigate to="/restaurant/admin/login" />;
    }

    useEffect(() => {
        localStorage.setItem("restaurant_id", resData?.data?.id);
        localStorage.setItem("restaurant_name", resData?.data?.name);
    }, [resData]);


    return (
        <Box
            display={isNonMobile ? "flex" : "block"}
            width="100%"
            height="100%"
        >
            <CssBaseline />
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar

                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default RestaurantLayout;

import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/customer/HomePage';
import NotFound from './pages/customer/NotFound';
import FeedPage from './pages/customer/FeedPage';
import LoginPage from './pages/customer/LoginPage';
import SignUpPage from './pages/customer/SignUpPage';
import MenuPage from "./pages/customer/MenuPage";

import RestaurantDashboard from './pages/restaurant/HomePage';
import ProductsPage from './pages/restaurant/ProductsPage';

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import CustomerLayout from './layouts/CustomerLayout';
import RestaurantLayout from './layouts/RestaurantLayout';



function App() {

    const mode = useSelector((state) => state.global.mode);

    const theme = useMemo(() => {
        return createTheme(themeSettings(mode))
    }, [mode]);

    return (
        <>
            <BrowserRouter>
                <ThemeProvider theme={theme}>

                    <Routes>
                        <Route element={<CustomerLayout />}>
                            <Route path="/" element={ <HomePage /> } />
                            <Route path="feed" element={ <FeedPage /> } />
                            <Route path="login" element={ <LoginPage /> } />
                            <Route path="signup" element={ <SignUpPage /> } />
                            <Route path="menu" element={ <MenuPage /> } />
                        </Route>

                        <Route element={<RestaurantLayout />}>

                            <Route path="/dashboard" element={ <RestaurantDashboard /> } />
                            <Route path="/products" element={ <ProductsPage /> } />
                        </Route>
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>

                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}

export default App

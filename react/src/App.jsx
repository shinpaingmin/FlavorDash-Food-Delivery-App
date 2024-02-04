import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/customer/HomePage';
import NotFound from './pages/customer/NotFound';
import FeedPage from './pages/customer/FeedPage';
import LoginPage from './pages/customer/LoginPage';
import SignUpPage from './pages/customer/SignUpPage';
import MenuPage from "./pages/customer/MenuPage";

import AdminHomePage from './pages/restaurant/HomePage';

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";


function App() {

    const mode = useSelector((state) => state.global.mode);
    console.log(mode)

    const theme = useMemo(() => {
        return createTheme(themeSettings(mode))
    }, [mode]);
    console.log(theme)

    const [open, setOpen] = useState(false);

    useEffect(() => {
        open && document.body.classList.add('stop-scrolling');
        !open && document.body.classList.remove('stop-scrolling');
    }, [open])

  return (
    <>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
            <Header open={open} setOpen={setOpen} />
                <Routes>
                    <Route path="/" element={ <HomePage /> } />
                    <Route path="feed" element={ <FeedPage /> } />
                    <Route path="login" element={ <LoginPage /> } />
                    <Route path="signup" element={ <SignUpPage /> } />
                    <Route path="menu" element={ <MenuPage /> } />

                    <Route path="/admin/home" element={ <AdminHomePage /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Routes>
            <Footer />
            </ThemeProvider>
        </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/customer/HomePage';
import NotFound from './pages/customer/NotFound';
import FeedPage from './pages/customer/FeedPage';
import LoginPage from './pages/customer/LoginPage';
import SignUpPage from './pages/customer/SignUpPage';
import EmailVerifyPage from './pages/customer/EmailVerifyPage';
import MenuPage from "./pages/customer/MenuPage";
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderedPage from './pages/customer/OrderedPage';
import RestaurantSignUpPage from './pages/customer/RestaurantSignUpPage';

import RestaurantDashboard from './pages/restaurant/HomePage';
import ProductsPage from './pages/restaurant/ProductsPage';
import CreateProductsPage from './pages/restaurant/CreateProductsPage';
import CustomersPage from './pages/restaurant/CustomersPage';
// import TransactionsPage from './pages/restaurant/TransactionsPage';
import GeographyPage from './pages/restaurant/GeographyPage';
import OverviewPage from './pages/restaurant/OverviewPage';
import DailyPage from './pages/restaurant/DailyPage';
import BreakdownPage from './pages/restaurant/BreakdownPage';
import AdminPage from './pages/restaurant/AdminPage';

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import CustomerLayout from './layouts/CustomerLayout';
import RestaurantLayout from './layouts/RestaurantLayout';
import CategoryPage from './pages/restaurant/CategoryPage';
import GuestLayout from './layouts/GuestLayout';




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

                        {/* Only for guests  */}
                        <Route element={<GuestLayout />}>
                            <Route path="/" element={ <HomePage /> } />
                            <Route path="/login" element={ <LoginPage role="customer" /> } />
                            <Route path="/restaurant/admin/login" element={ <LoginPage role="admin" /> } />
                            <Route path="/signup" element={ <SignUpPage /> } />
                            <Route path="/feed/new" element={ <FeedPage /> } />
                            <Route path="/restaurant/signup" element={<RestaurantSignUpPage />} />
                        </Route>

                        {/* Only for cusomers  */}
                        <Route element={<CustomerLayout />}>
                            <Route path="/feed" element={ <FeedPage /> } />
                            <Route path="/email/verify" element={ <EmailVerifyPage /> } />
                            <Route path="/menu" element={ <MenuPage /> } />
                            <Route path="/checkout" element={ <CheckoutPage /> } />
                            <Route path="/ordered items" element={ <OrderedPage /> } />
                        </Route>

                        {/* Only for restaurant owners/admins  */}
                        <Route element={<RestaurantLayout />}>
                            <Route path="/dashboard" element={ <RestaurantDashboard /> } />
                            <Route path="/products" element={ <ProductsPage /> } />
                            <Route path="/products/create" element={ <CreateProductsPage /> } />
                            <Route path="/categories" element={ <CategoryPage /> } />
                            <Route path="/categories/create" element={ <CategoryPage /> } />
                            <Route path="/customers" element={ <CustomersPage /> } />
                            {/* <Route path="/transactions" element={ <TransactionsPage /> } /> */}
                            <Route path="/geography" element={ <GeographyPage /> } />
                            <Route path="/overview" element={ <OverviewPage /> } />
                            <Route path="/daily" element={ <DailyPage /> } />
                            <Route path="/breakdown" element={ <BreakdownPage /> } />
                            <Route path="/admin" element={ <AdminPage /> } />
                        </Route>
                        <Route path="*" element={ <NotFound /> } />
                    </Routes>

                </ThemeProvider>
            </BrowserRouter>
        </>
    )
}

export default App

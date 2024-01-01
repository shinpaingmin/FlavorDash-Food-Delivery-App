import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import FeedPage from './pages/FeedPage';


function App() {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        open && document.body.classList.add('stop-scrolling');
        !open && document.body.classList.remove('stop-scrolling');
    }, [open])

  return (
    <>
    <Header open={open} setOpen={setOpen} />
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="feed" element={ <FeedPage /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    <Footer />
    </>
  )
}

export default App

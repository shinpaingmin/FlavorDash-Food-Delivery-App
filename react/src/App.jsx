import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {

  return (
    <>
        <Routes>

            <Route path="/" element={ <HomePage /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    </>
  )
}

export default App

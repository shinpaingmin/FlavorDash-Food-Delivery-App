
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './state';
import { Provider } from 'react-redux';

const store = configureStore({
    reducer: {
        global: globalReducer,
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

import { configureStore } from "@reduxjs/toolkit";
import { foodDeliveryWebApis } from "./services";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalReducer from "./state"

export const store = configureStore({
    reducer: {
        global: globalReducer,
        [foodDeliveryWebApis.reducerPath]: foodDeliveryWebApis.reducer,
    },
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware().concat(foodDeliveryWebApis.middleware)
    ),
});

setupListeners(store.dispatch);

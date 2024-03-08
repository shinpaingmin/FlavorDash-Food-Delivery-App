import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodDeliveryWebApis = createApi({
    reducerPath: "foodDeliveryWebApis",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    endpoints: (builder) => ({
        getRestaurantsByOrdered: builder.query({
            query: () => "restaurants/ordered",
        }),
    }),
});

export const { useGetRestaurantsByOrderedQuery } = foodDeliveryWebApis;

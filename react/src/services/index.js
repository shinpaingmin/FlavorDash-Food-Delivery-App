import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const foodDeliveryWebApis = createApi({
    reducerPath: "foodDeliveryWebApis",
    baseQuery: fetchBaseQuery({
            baseUrl: "http://localhost:8000/api/",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
    }),
    tagTypes: ['User', 'Restaurants', 'RestaurantTypes', 'RestaurantTownships', 'Categories'],
    endpoints: (builder) => ({

        addUser: builder.mutation({
            query: (body) => ({
                url: "signup",
                method: "POST",
                body
            }),
            invalidatesTags: ['User']
        }),
        loginAuth: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST"
            })
        }),
        checkEmailVerify: builder.query({
            query: () => ({
                url: "email/check",
                method: "GET",
            }),
        }),
        getRegenerateEmailVerify: builder.query({
            query: () => "email/resend",
        }) ,
        addNewRestaurant: builder.mutation({
            query: (body) => ({
                url: "restaurant/signup",
                method: "POST",
                body
            }),
            invalidatesTags: ['Restaurants']
        }),
        getRestaurantsByOrdered: builder.query({
            query: () => "restaurants/ordered",

        }),
        getAllRestaurants: builder.query({
            query: (search) => `restaurants/${search}`
        }),
        getRestaurantTypes: builder.query({
            query: () => "restaurantTypes",
            providesTags: ['RestaurantTypes']
        }),
        getRestaurantTownships: builder.query({
            query: () => "restaurantTownships",
            providesTags: ['RestaurantTownships']
        }),


        getCategories: builder.query({
            query: () => "categories",
            providesTags: ["Categories"]
        })
    }),
});

export const {
    useGetRestaurantsByOrderedQuery,
    useLoginAuthMutation,
    useAddUserMutation,
    useLogoutMutation,
    useCheckEmailVerifyQuery,
    useGetRegenerateEmailVerifyQuery,
    useAddNewRestaurantMutation,
    useGetAllRestaurantsQuery,
    useGetRestaurantTypesQuery,
    useGetRestaurantTownshipsQuery,
    useGetCategoriesQuery,
} = foodDeliveryWebApis;

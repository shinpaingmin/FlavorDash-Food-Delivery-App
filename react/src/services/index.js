import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { isRejectedWithValue } from "@reduxjs/toolkit";

// export const customMiddleware =
//   (api) => (next) => (action) => {
//     // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
//     if (isRejectedWithValue(action) && action.error.status === 401) {
//       console.error('Unauthorized access! Redirecting to login...')
//       localStorage.clear();
//     }

//     return next(action)
//   }

export const foodDeliveryWebApis = createApi({
    reducerPath: "foodDeliveryWebApis",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/",
        prepareHeaders: (headers) => {
            let token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        "User",
        "Restaurants",
        "RestaurantTypes",
        "RestaurantTownships",
        "Categories",
        "Products",
        "Product"
    ],
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (body) => ({
                url: "signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        loginAuth: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "logout",
                method: "POST",
            }),
        }),

        getAdminRestaurant: builder.query({
            query: () => "admin/restaurant",
        }),

        checkEmailVerify: builder.query({
            query: () => ({
                url: "email/check",
                method: "GET",
            }),
        }),
        getRegenerateEmailVerify: builder.query({
            query: () => ({
                url: "email/resend",
                method: "GET",
            }),
        }),
        addNewRestaurant: builder.mutation({
            query: (body) => ({
                url: "restaurant/signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Restaurants"],
        }),

        getAllRestaurants: builder.query({
            query: ({
                searchTownship,
                sortBy,
                filterByCuisine,
                filterByDietary,
                filterByPrice,
                filterByRating,
                filterBySearch,
            }) => ({
                url: `restaurants?searchTownship=${searchTownship}&sortBy=${sortBy}&filterByCuisine=${filterByCuisine}&filterByDietary=${filterByDietary}
                &filterByPrice=${filterByPrice}&filterByRating=${filterByRating}&filterBySearch=${filterBySearch}`,
                method: "GET",
            }),
        }),

        getRestaurantTypes: builder.query({
            query: () => "restaurantTypes",
            providesTags: ["RestaurantTypes"],
        }),

        getRestaurantTownships: builder.query({
            query: () => "restaurantTownships",
            providesTags: ["RestaurantTownships"],
        }),

        getCategories: builder.query({
            query: () => "categories",
            providesTags: ["Categories"],
        }),

        getDietaries: builder.query({
            query: () => "dietaries",
        }),

        addNewDietary: builder.mutation({
            query: (body) => ({
                url: "dietary",
                method: "POST",
                body,
            }),
        }),

        getAllProducts: builder.query({
            query: (id) => `products/restaurant/${id}`,
            providesTags: ["Products"],
        }),

        getProductsByCategories: builder.query({
            query: (id) => `products/restaurant/${id}?groupBy=categories`,
            providesTags: ["Products"],
        }),

        getTheProduct: builder.query({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET"
            }),
            providesTags: ["Product"],
        }),

        addNewProduct: builder.mutation({
            query: (body) => ({
                url: "product",
                method: "POST",
                body
            }),
            invalidatesTags: ["Products", "Product"]
        }),

        updateProduct: builder.mutation({
            query: (body) => ({
                url: `product/${body.get("id")}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Products", "Product"],
        }),

        destoryProduct: builder.mutation({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products", "Product"],
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: "admin/logout",
                method: "POST"
            })
        })
    }),
});

export const {
    useGetRestaurantsByOrderedQuery,
    useLoginAuthMutation,
    useAddUserMutation,
    useLogoutMutation,
    useGetAdminRestaurantQuery,
    useCheckEmailVerifyQuery,
    useGetRegenerateEmailVerifyQuery,
    useAddNewRestaurantMutation,
    useGetAllRestaurantsQuery,
    useGetRestaurantTypesQuery,
    useGetRestaurantTownshipsQuery,
    useGetCategoriesQuery,
    useGetDietariesQuery,
    useAddNewDietaryMutation,
    useGetAllProductsQuery,
    useGetProductsByCategoriesQuery,
    useGetTheProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDestoryProductMutation,
    useAdminLogoutMutation,
} = foodDeliveryWebApis;

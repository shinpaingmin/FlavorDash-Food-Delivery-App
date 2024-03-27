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
        "Category",
        "RestaurantCategories",
        "Products",
        "Product",
        "FavoriteRestaurants",
        "Add-ons",
        "Add-on",
        "CartItems",
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

        getTheRestaurant: builder.query({
            query: (id) => `restaurant/${id}`
        }),

        getRestaurantTypes: builder.query({
            query: () => "restaurantTypes",
            providesTags: ["RestaurantTypes"],
        }),

        getRestaurantTownships: builder.query({
            query: () => "restaurantTownships",
            providesTags: ["RestaurantTownships"],
        }),

        // getCategories: builder.query({
        //     query: () => "categories",
        //     providesTags: ["Categories"],
        // }),

        getTheCategory: builder.query({
            query: (id) => `category/${id}`,
            providesTags: ["Category"]
        }),

        getRestaurantCategories: builder.query({
            query: (id) => `categories/restaurant/${id}`,
            providesTags: ["RestaurantCategories"],
        }),

        addCategories: builder.mutation({
            query: (body) => ({
                url: "category",
                method: "POST",
                body
            }),
            invalidatesTags: ["RestaurantCategories", "Category"],
        }),

        updateCategory: builder.mutation({
            query: (body) => ({
                url: `category/${body.get("id")}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["RestaurantCategories", "Category"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["RestaurantCategories", "Category"]
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

        getAllRestaurantAddOns: builder.query({
            query: (id) => `addons/restaurant/${id}`,
            providesTags: ["AddOns"],
        }),

        getTheAddOn: builder.query({
            query: (id) => ({
                url: `addon/${id}`,
                method: "GET"
            }),
            providesTags: ["AddOn"],
        }),

        addNewAddOn: builder.mutation({
            query: (body) => ({
                url: "addon",
                method: "POST",
                body
            }),
            invalidatesTags: ["AddOns", "AddOn"]
        }),

        updateAddOn: builder.mutation({
            query: (body) => ({
                url: `addon/${body.get("id")}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddOns", "AddOn"],
        }),

        destoryAddOn: builder.mutation({
            query: (id) => ({
                url: `addon/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AddOns", "AddOn"],
        }),

        adminLogout: builder.mutation({
            query: () => ({
                url: "admin/logout",
                method: "POST"
            })
        }),

        addRestaurantToFavorite: builder.mutation({
            query: (id) => ({
                url: `favorite/restaurant/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["FavoriteRestaurants"],
        }),

        addItemsToCart: builder.mutation({
            query: (body) => ({
                url: "cart",
                method: "POST",
                body
            }),
            invalidatesTags: ["CartItems"],
        }),

        getCartItems: builder.query({
            query: () => "cart/items",
            providesTags: ["CartItems"]
        }),

        getPromoCodes: builder.query({
            query: () => "promo/codes",

        }),
    }),
});

export const {
    useLoginAuthMutation,
    useAddUserMutation,
    useLogoutMutation,
    useGetAdminRestaurantQuery,
    useCheckEmailVerifyQuery,
    useGetRegenerateEmailVerifyQuery,
    useAddNewRestaurantMutation,
    useGetAllRestaurantsQuery,
    useGetTheRestaurantQuery,
    useGetRestaurantTypesQuery,
    useGetRestaurantTownshipsQuery,
    useGetTheCategoryQuery,
    useGetRestaurantCategoriesQuery,
    useAddCategoriesMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetDietariesQuery,
    useAddNewDietaryMutation,
    useGetAllProductsQuery,
    useGetProductsByCategoriesQuery,
    useGetTheProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDestoryProductMutation,
    useGetAllRestaurantAddOnsQuery,
    useGetTheAddOnQuery,
    useAddNewAddOnMutation,
    useUpdateAddOnMutation,
    useDestoryAddOnMutation,
    useAdminLogoutMutation,
    useAddRestaurantToFavoriteMutation,
    useAddItemsToCartMutation,
    useGetCartItemsQuery,
    useGetPromoCodesQuery,
} = foodDeliveryWebApis;

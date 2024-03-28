import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, useTheme, Button } from "@mui/material";
import Header from "../../components/restaurant/Header";
import {
    useDestoryProductMutation,
    useGetAllProductsQuery,
    useGetRestaurantCategoriesQuery,
} from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ImageContainer from "../../components/restaurant/ImageContainer";

const OrdersPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useSearchParams();
    const [restaurantId, setRestaurantId] = useState(localStorage.getItem("restaurant_id"));


    const successToastMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });

    }

    const columns = useMemo(
        () => [

            {
                field: "order_code",
                headerName: "Order code",
                flex: 0.7,
            },
            {
                field: "user_name",
                headerName: "User Name",
                type: "sting",
                flex: 1,
            },
            {
                field: "phone",
                headerName: "Phone number",
                type: "sting",
                flex: 0.8,
            },
            {
                field: "payment",
                headerName: "Payment",
                // type: "singleSelect",
                flex: 1,

            },
            {
                field: "order_status",
                headerName: "Order status",
                // type: "singleSelect",
                flex: 1,

            },
            {
                field: "payment_status",
                headerName: "Payment status",
                // type: "singleSelect",
                flex: 1,

            },
            {
                field: "normal_price",
                headerName: "Original price",
                type: "number",
                flex: 1,
                valueFormatter: (params) =>
                    `${params.value.toLocaleString()} MMK`, // price formatting
            },
            {
                field: "discount_price",
                headerName: "Discount price",
                type: "number",
                flex: 1,
                valueFormatter: (params) => params.value && `${params.value.toLocaleString()} MMK`
            },
            {
                field: "quantity",
                headerName: "Quantity",
                type: "number",
                flex: 0.5,
            },
            {
                field: "actions",
                headerName: "Actions",
                flex: 1,
                type: "actions",
                getActions: (params) => ([
                    <GridActionsCellItem
                        key={1}
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => navigate(`/product/edit/${params.row.id}`)}
                    />,
                    <GridActionsCellItem
                        key={2}
                        icon={<DeleteIcon />}
                        label="Delete"
                        // onClick={() => removeProduct(params.row.id)}
                    />,
                ]),
                sortable: false,
                filterable: false,
            },
        ],
        []
    );

    return (
        <Box m="1.5rem 2.5rem">
            <Toaster />
            <FlexBetween>
                <Header
                    title="PRODUCTS"
                    subtitle="See your list of products."
                />
                <Box>
                    <Button
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.secondary[300],
                            },
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={() => navigate("/product/create")}
                    >
                        <AddIcon />
                        Add Products
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                {/* <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row.id}
                    columns={columns}
                    rows={products?.data || []}
                    rowHeight={60}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                /> */}
            </Box>
        </Box>
    );
};

export default OrdersPage;

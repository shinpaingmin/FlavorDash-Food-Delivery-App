import { useEffect, useMemo } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, useTheme, Button } from "@mui/material";
import Header from "../../components/restaurant/Header";
import { useDestoryProductMutation, useGetAllProductsQuery } from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ImageContainer from "../../components/restaurant/ImageContainer";

const ProductsPage = () => {
    // const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useSearchParams();
    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useGetAllProductsQuery();
    const [destroyProduct, {isSuccess}] = useDestoryProductMutation();

    useEffect(() => {
        if (queryParams.get("status") === "success") {
            toast.success("Added the product successfully!", {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#bbf7d0",
                },
            });

            setQueryParams({
                status: "",
            });
        }

        if(isSuccess) {
            toast.success("Deleted the product successfully!", {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#bbf7d0",
                },
            })
        }
    }, [isSuccess]);

    const removeProduct = (id) => {
        if(confirm("Are you sure to delete this product?")) {
            destroyProduct(id);
        }
    }


    const columns = useMemo(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                flex: 0.5,
            },
            {
                field: "image",
                headerName: "Image",
                flex: 1,
                sortable: false,
                filterable: false,
                renderCell: ImageContainer,
            },
            {
                field: "name",
                headerName: "Name",
                type: "sting",
                flex: 1,
            },
            {
                field: "category_name",
                headerName: "Category",
                type: "string",
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
            },
            {
                field: "quantity",
                headerName: "Quantity",
                type: "number",
                flex: 1,
            },
            {
                field: "menu_size_id",
                headerName: "Size",
                type: "string",
                flex: 1,
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
                        onClick={() => {}}
                    />,
                    <GridActionsCellItem
                        key={1}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => removeProduct(params.row.id)}
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
                        onClick={() => navigate("/products/create")}
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
                <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row.id}
                    columns={columns}
                    rows={products?.data || []}
                    rowHeight={60}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                />
            </Box>
        </Box>
    );
};

export default ProductsPage;

import { useMemo } from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, useTheme, Button } from "@mui/material";
import Header from "../../components/restaurant/Header";
import { useGetAllProductsQuery } from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
    // const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const navigate = useNavigate();

    const {
        data: products = [],
        isLoading,
        isError,
        error,
    } = useGetAllProductsQuery();

    const columns = useMemo(() => ([
        {
            field: "id",
            headerName: "ID",
            type: "number",
            flex: 0.5,
        },
        {
            field: "image",
            headerName: "Image",
            type: "string",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            type: "sting",
            flex: 1,
        },
        {
            field: "category_id",
            headerName: "Category",
            type: "string",
            flex: 1,
        },
        {
            field: "price",
            headerName: "Price",
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
            type: "number",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            getActions: (params) => [
                <GridActionsCellItem
                    key={1}
                    icons={<EditIcon />}
                    label="Edit"
                    onClick={() => {}}
                />,
                <GridActionsCellItem
                    key={1}
                    icons={<DeleteIcon />}
                    label="Delete"
                    onClick={() => {}}
                />,
            ],
            sortable: false,
            filterable: false,
        },
    ]), [])

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="PRODUCTS" subtitle="See your list of products." />
                <Box>
                    <Button
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.secondary[500],
                            },
                            backgroundColor: theme.palette.secondary[400],
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
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
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading}
                    getRowId={(row) => row.id}
                    columns={columns}
                    rows={products?.data || []}

                />
            </Box>
        </Box>
    );
};

export default ProductsPage;

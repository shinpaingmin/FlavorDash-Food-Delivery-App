import { Box, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/restaurant/Header";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import { useDeleteCategoryMutation, useGetRestaurantCategoriesQuery } from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const CategoryPage = () => {
    const theme = useTheme();
    const [queryParams, setQueryParams] = useSearchParams();
    const [restaurantId, setRestaurantId] = useState(localStorage.getItem("restaurant_id"));
    const { data: categories, isLoading, isError, error } = useGetRestaurantCategoriesQuery(restaurantId);
    const navigate = useNavigate();
    const [deleteCategory, {isSuccess}] = useDeleteCategoryMutation();

    const successToastMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });

    }
    // console.log(categories)

    useEffect(() => {
        if (queryParams.get("status") === "createSuccess") {
            successToastMessage("Added the category successfully!")
            setQueryParams({
                status: "",
            });
        } else if(queryParams.get("status") === "updateSuccess") {
            successToastMessage("Updated the category successfully!")
            setQueryParams({
                status: "",
            });
        }

        if(isSuccess) {
            successToastMessage("Deleted the category successfully!");
        }
    }, [isSuccess]);

    const removeCategory = (id) => {
        if(confirm("Are you sure to delete this category?")) {
            deleteCategory(id);
        }
    }

    const columns = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Category name",
            flex: 1,
        },
        {
            field: "created_at",
            headerName: "Created date",
            type: "datetime",
            flex: 1,
            valueGetter: (params) => {
                return moment(params?.value).format('DD/MM/YYYY hh:mm A');
            }
        },
        {
            field: "updated_at",
            headerName: "Updated date",
            type: "datetime",
            flex: 1,
            valueGetter: (params) => {
                return moment(params?.value).format('DD/MM/YYYY hh:mm A');
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            type: "actions",
            cellClassName: "actions",
            getActions: (params) => ([
                <GridActionsCellItem
                    key={1}
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => navigate(`/category/edit/${params.row.id}`)}
                />,
                <GridActionsCellItem
                    key={2}
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => removeCategory(params.row.id)}
                />,
            ]),
            sortable: false,
            filterable: false,
        },
    ], []) ;

    return (
        <Box m="1.5rem 2.5rem">
            <Toaster />
            <FlexBetween>
                <Header
                    title="CATEGORIES"
                    subtitle="Manage your category list on your own!"
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
                        onClick={() => navigate("/category/create")}
                    >
                        <AddIcon />
                        Create Categories
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
                    "&. MuiDataGrid-footerContainer": {
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
                    rows={categories?.data || []}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 20, 30]}
                />
            </Box>
        </Box>
    );
};

export default CategoryPage;

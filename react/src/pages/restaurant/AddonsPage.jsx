import { Box, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/restaurant/Header";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
    useDestoryAddOnMutation,
    useGetAllRestaurantAddOnsQuery,
} from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import ImageContainer from "../../components/restaurant/ImageContainer";

const AddonsPage = () => {
    const theme = useTheme();
    const [queryParams, setQueryParams] = useSearchParams();
    const [restaurantId, setRestaurantId] = useState(localStorage.getItem("restaurant_id"));
    const {
        data: addons,
        isLoading,
        isError,
        error,
    } = useGetAllRestaurantAddOnsQuery(restaurantId);
    const navigate = useNavigate();
    const [deleteAddOn, { isSuccess }] = useDestoryAddOnMutation();

    const successToastMessage = (message) => {
        toast.success(message, {
            position: "bottom-right",
            style: {
                padding: "10px",
                backgroundColor: "#bbf7d0",
            },
        });

    }

    useEffect(() => {
        if (queryParams.get("status") === "createSuccess") {
            successToastMessage("Added the add-on successfully!")
            setQueryParams({
                status: "",
            });
        } else if(queryParams.get("status") === "updateSuccess") {
            successToastMessage("Updated the add-on successfully!")
            setQueryParams({
                status: "",
            });
        }

        if(isSuccess) {
            successToastMessage("Deleted the add-on successfully!");
        }
    }, [isSuccess]);

    const removeAddOn = (id) => {
        if(confirm("Are you sure to delete this add-on?")) {
            deleteAddOn(id);
        }
    }

    const columns = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "image",
            headerName: "Image",
            flex: 0.8,
            sortable: false,
            filterable: false,
            renderCell: ImageContainer,
        },
        {
            field: "name",
            headerName: "Add-on/Topping name",
            flex: 1,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            flex: 0.5,
            valueFormatter: (params) => (
                `${params.value.toLocaleString()} MMK`
            )
        },
        {
            field: "quantity",
            headerName: "Quantity",
            type: "number",
            flex: 0.5,
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
                    onClick={() => navigate(`/addon/edit/${params.row.id}`)}
                />,
                <GridActionsCellItem
                    key={2}
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => removeAddOn(params.row.id)}
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
                    title="Add-ons/Toppings"
                    subtitle="Manage your add-on list on your own!"
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
                        onClick={() => navigate("/addon/create")}
                    >
                        <AddIcon />
                        Create Add-ons
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
                    rows={addons?.data || []}
                    columns={columns}
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

export default AddonsPage;

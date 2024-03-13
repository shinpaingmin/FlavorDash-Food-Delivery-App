import { Box, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Header from "../../components/restaurant/Header";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { useGetCategoriesQuery } from "../../services";
import FlexBetween from "../../components/restaurant/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        //id need?
        setRows((oldRows) => [
            ...oldRows,
            { id: "", name: "", created_at: "", updated_at: "", isNew: true },
        ]);
        // setRowModesModel((oldModel) => ({
        //     ...oldModel,
        //     [id]: {mode}
        // }))

        return (
            <GridToolbarContainer>
                <Button startIcon={<AddIcon />} onClick={handleClick}>
                    Create category
                </Button>
            </GridToolbarContainer>
        );
    };
}

const CategoryPage = () => {
    const theme = useTheme();
    const { data, isLoading, isError, error } = useGetCategoriesQuery();
    const navigate = useNavigate();

    const [rows, setRows] = useState(data?.data);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
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
            // type: "date",
            flex: 1,
        },
        {
            field: "updated_at",
            headerName: "Updated date",
            // type: "date",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            type: "actions",
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: theme.palette.secondary,
                            }}
                            onClick={handleSaveClick(id)}
                            key={id}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                            key={id}
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                        key={id}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                        key={id}
                    />,
                ];
            },
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header
                    title="CATEGORIES"
                    subtitle="Manage your category list on your own!"
                />
                <Box>
                    <Button
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.secondary.light,
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
                    loading={isLoading ? "Loading..." : ""}
                    // getRowId={(row) => row.id}
                    rows={data?.data || []}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                />
            </Box>
        </Box>
    );
};

export default CategoryPage;

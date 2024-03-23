import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import {
    useAddCategoriesMutation,
} from "../../services";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const INIT_DATA = {
    // restaurant_id,
    name: "",
};

const CreateCategoryPage = () => {
    const [data, setData] = useState(INIT_DATA);
    // add query
    const [addCategory, {isSuccess, isError, error}] = useAddCategoriesMutation();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || error?.status, {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#fecaca",
                },
            });
        } else if (isSuccess) {
            navigate("/categories?status=createSuccess");
        }
    }, [isError, isSuccess]);

    const updateFields = (fields) => {
        setData((prev) => ({
            ...prev,
            ...fields,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (confirm("Are you sure to add a new category?")) {
            addCategory(data);
            setData(INIT_DATA);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Toaster />
            <Box>
                <Link to="/categories">
                    <KeyboardDoubleArrowLeftIcon /> Back
                </Link>
            </Box>
            <Typography
                textAlign="center"
                variant="h5"
                marginBottom={3}
                color={theme.palette.secondary[500]}
                fontWeight="bold"
            >
                Add a new category
            </Typography>

            {error?.status == 422 && (
                <Typography
                    textAlign="center"
                    variant="h6"
                    marginBottom={3}
                    color="error"
                    fontWeight="bold"
                >
                    Validation Error!
                </Typography>
            )}

            <Box width={450} m="0 auto" component="form" onSubmit={onSubmit}>
                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Name (*)
                </Typography>
                <TextField
                    value={data.name}
                    placeholder="Enter the category name"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) => updateFields({ name: e.target.value })}
                    required
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.name}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "50px 0 0",
                    }}
                >
                    <Button
                        type="submit"
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.secondary[500],
                            },
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Add the category
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateCategoryPage;

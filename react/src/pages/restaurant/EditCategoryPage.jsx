import { useParams } from "react-router-dom";
import { useGetTheCategoryQuery,  useUpdateCategoryMutation } from "../../services";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const INIT_DATA = {
    name: "",
};

const EditCategoryPage = () => {
    const { id } = useParams();
    const { data: oldData, isSuccess: oldDataReceived } = useGetTheCategoryQuery(id);
    const [newData, setNewData] = useState(INIT_DATA);
    const [updateCategory, {isSuccess, isError, error}] = useUpdateCategoryMutation();
    const theme = useTheme();
    const navigate = useNavigate();

    console.log(oldData)
    useEffect(() => {
        if(oldDataReceived) {
            setNewData({
                id: oldData.data.id,
                restaurant_id: oldData.data.restaurant_id,
                name: oldData.data.name,
            });
        }
        if (isError) {
            toast.error(error?.data?.message || error?.status, {
                position: "bottom-right",
                style: {
                    padding: "10px",
                    backgroundColor: "#fecaca",
                },
            });
        } else if (isSuccess) {
            navigate("/categories?status=updateSuccess");
        }
    }, [isError, isSuccess, oldDataReceived]);



    const updateFields = (fields) => {
        setNewData((prev) => ({ ...prev, ...fields }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (confirm("Are you sure to update this product?")) {

            const formData = new FormData();
            for(const prop in newData) {
                formData.append(`${prop}`, newData[prop]);
            }
            updateCategory(formData);
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
                Update the category
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
                    value={newData.name}
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
                        Update the category
                    </Button>
                </Box>
            </Box>
        </Box>
  )
}

export default EditCategoryPage

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useGetTheAddOnQuery, useUpdateAddOnMutation } from "../../services";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const INIT_DATA = {
    id: "",
    name: "",
    price: "",
    quantity: "",
    image: "",
};

const EditAddOnPage = () => {
    const {id} = useParams();
    const { data: oldData, isSuccess: oldDataReceived } = useGetTheAddOnQuery(id);
    const [newData, setNewData] = useState(INIT_DATA);
    const theme = useTheme();
    const navigate = useNavigate();
    const [updateAddOn, {isSuccess, isError, error}] = useUpdateAddOnMutation();

    useEffect(() => {
        if(oldDataReceived) {
            setNewData({
                id: oldData.data.id,
                name: oldData.data.name,
                price: oldData.data.price,
                quantity: oldData.data.quantity || "",
                image: "",
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
            navigate("/add-ons?status=updateSuccess");
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

            updateAddOn(formData);
        }
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Toaster />
            <Box>
                <Link to="/products">
                    <KeyboardDoubleArrowLeftIcon /> Back
                </Link>
            </Box>
            <Typography
                textAlign="center"
                variant="h5"
                marginBottom={2}
                color={theme.palette.secondary[500]}
                fontWeight="bold"
            >
                Modify your add-on
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
                    marginTop={2}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Name (*)
                </Typography>
                <TextField
                    value={newData.name}
                    placeholder="Enter the add-on name"
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

                <Typography
                    marginBottom={1}
                    marginTop={2}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Price (*)
                </Typography>
                <TextField
                    value={newData.price}
                    placeholder="Enter the add-on price"
                    type="number"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) => updateFields({ price: e.target.value })}
                    required
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.price}
                </Typography>

                <Typography
                    marginBottom={1}
                    marginTop={2}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Quantity (optional)
                </Typography>
                <TextField
                    value={newData.quantity}
                    placeholder="Enter the add-on quantity"
                    type="number"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) => updateFields({ quantity: e.target.value })}
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.quantity}
                </Typography>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Image
                </Typography>
                <TextField
                    type="file"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) => updateFields({ image: e.target.files[0] })}
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.image}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "30px 0 0",
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
                        Update add-on
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditAddOnPage;

import { useParams } from "react-router-dom";
import { useGetTheProductQuery, useUpdateProductMutation } from "../../services";
import { useState, useEffect } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useGetCategoriesQuery } from "../../services";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const INIT_DATA = {
    //restaurant_id,
    category_id: "",
    menu_size_id: "",
    name: "",
    normal_price: "",
    discount_price: "",
    quantity: "",
    image: "",
};

const EditProductPage = () => {
    const { id } = useParams();
    const { data: oldData, isSuccess: oldDataReceived } = useGetTheProductQuery(id);
    const [newData, setNewData] = useState(INIT_DATA);
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
    const [updateProduct, {isSuccess, isError, error}] = useUpdateProductMutation();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if(oldDataReceived) {
            setNewData({
                id: oldData.data.id,
                restaurant_id: oldData.data.restaurant_id,
                category_id: oldData.data.category_id,
                menu_size_id: oldData.data.menu_size_id || "",
                name: oldData.data.name,
                normal_price: oldData.data.normal_price,
                discount_price: oldData.data.discount_price || "",
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
            navigate("/products?status=updateSuccess");
        }
    }, [isError, isSuccess, oldDataReceived]);

    console.log(newData)

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

            updateProduct(formData);
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
                Modify your product
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
                    placeholder="Enter the product name"
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
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Category name (*)
                </Typography>
                <TextField
                    value={newData.category_id}
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    select
                    onChange={(e) =>
                        updateFields({ category_id: e.target.value })
                    }
                    required
                >
                    {categoriesLoading ? (
                        <div>Loading ....</div>
                    ) : categories?.data ? (
                        categories.data.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))
                    ) : (
                        <div>No category found</div>
                    )}
                    {/* <MenuItem value="">None</MenuItem> */}
                </TextField>
                <Typography variant="caption" color="error">
                    {error?.data?.data?.category_id}
                </Typography>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Normal price (*)
                </Typography>
                <TextField
                    value={newData.normal_price}
                    type="number"
                    placeholder="The original price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) =>
                        updateFields({ normal_price: e.target.value })
                    }
                    required
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.normal_price}
                </Typography>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Discount price (optional)
                </Typography>
                <TextField
                    value={newData.discount_price}
                    type="number"
                    placeholder="The discount price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) =>
                        updateFields({
                            discount_price: e.target.value,
                        })
                    }
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.discount_price}
                </Typography>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Quantity (optional)
                </Typography>
                <TextField
                    value={newData.quantity}
                    type="number"
                    placeholder="The quantity of the product"
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
                    Size (optional)
                </Typography>
                <TextField
                    value={newData.menu_size_id}
                    placeholder="The size of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    select
                    onChange={(e) =>
                        updateFields({ menu_size_id: e.target.value })
                    }
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.menu_size_id}
                </Typography>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                    marginTop={2}
                >
                    Image (*)
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
                        Update the product
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditProductPage;

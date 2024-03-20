import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import {
    useAddNewProductMutation,
    useGetCategoriesQuery,
} from "../../services";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const INIT_DATA = {
    //restaurant_id,
    category_id: "", // int
    menu_size_id: "", //int
    name: "",
    normal_price: "", // int
    discount_price: "", // int
    quantity: "", // int
    image: "",
};

const CreateProductsPage = () => {
    const [data, setData] = useState(INIT_DATA);
    const { data: categories, isLoading: categoriesLoading } =
        useGetCategoriesQuery();
    const [addNewProduct, { isSuccess, isError, error }] =
        useAddNewProductMutation();
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
            navigate("/products?status=success");
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

        if (confirm("Are you sure to add a new product?")) {
            const formData = new FormData();

            for (const prop in data) {
                formData.append(`${prop}`, data[prop]);
            }

            addNewProduct(formData);
            // setData(INIT_DATA);
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
                Add a new product
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
                    value={data.category_id}
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    select
                    onChange={(e) =>
                        updateFields({ category_id: parseInt(e.target.value) })
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
                    value={data.normal_price}
                    type="number"
                    placeholder="The original price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) =>
                        updateFields({ normal_price: parseInt(e.target.value) })
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
                    value={data.discount_price}
                    type="number"
                    placeholder="The discount price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) =>
                        updateFields({
                            discount_price: parseInt(e.target.value),
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
                    value={data.quantity}
                    type="number"
                    placeholder="The quantity of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                    }}
                    onChange={(e) =>
                        updateFields({ quantity: parseInt(e.target.value) })
                    }
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
                    value={data.menu_size_id}
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
                    required
                />
                <Typography variant="caption" color="error">
                    {error?.data?.data?.image}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "10px 0 0",
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
                        Add the product
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateProductsPage;

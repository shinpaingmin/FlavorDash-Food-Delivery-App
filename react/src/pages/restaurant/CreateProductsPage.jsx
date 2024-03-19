import { Box, MenuItem, TextField, Typography, useTheme } from "@mui/material";
import { useAddNewProductMutation, useGetCategoriesQuery } from "../../services";

const CreateProductsPage = () => {
    const {data: categories, isLoading: categoriesLoading} = useGetCategoriesQuery();
    const [addNewProduct, { data, isSuccess, isError, error }] =
        useAddNewProductMutation();
    const theme = useTheme();

    return (
        <Box m="1.5rem 2.5rem" component="form">
            <Typography
                textAlign="center"
                variant="h5"
                marginBottom={5}
                color={theme.palette.secondary[500]}
                fontWeight="bold"
            >
                Add a new product
            </Typography>

            <Box width={450} m="0 auto">
                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Name (*)
                </Typography>
                <TextField
                    placeholder="Enter the product name"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                />

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Category name (*)
                </Typography>
                <TextField
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}
                    select

                >
                    {
                        categoriesLoading ? (
                            <div>Loading ....</div>
                        ) : (
                            categories?.data ? (
                                categories.data.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            ) : (
                                <div>No category found</div>
                            )
                        )
                    }
                    {/* <MenuItem value="">None</MenuItem> */}
                </TextField>

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Normal price (*)
                </Typography>
                <TextField
                    type="number"
                    placeholder="The original price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                />

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Discount price (optional)
                </Typography>
                <TextField
                    type="number"
                    placeholder="The discount price of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                />

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Quantity (optional)
                </Typography>
                <TextField
                    type="number"
                    placeholder="The quantity of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                />

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Size (optional)
                </Typography>
                <TextField
                    placeholder="The size of the product"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                    select
                />

                <Typography
                    marginBottom={1}
                    color={theme.palette.secondary[500]}
                    fontWeight="bold"
                >
                    Image (*)
                </Typography>
                <TextField
                    type="file"
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary[500],
                        width: "100%",
                        marginBottom: "20px",
                    }}

                />
            </Box>
        </Box>
    );
};

export default CreateProductsPage;

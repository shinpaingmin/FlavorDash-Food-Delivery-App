import { useState } from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import Header from "../../components/restaurant/Header";

const ProductsPage = () => {
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="PRODUCTS" subtitle="See your list of products." />

            {/* loading condition here  */}
            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                }}
            >
                {/* products data map here  */}
                {
                    [...Array(5)].map((_, i) => (
                        <Card
                            key={i}
                            sx={{
                                backgroundImage: "none",
                                backgroundColor: theme.palette.background.alt,
                                borderRadius: "0.55rem"
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontSize: 14
                                    }}
                                    color={theme.palette.secondary[700]}
                                    gutterBottom
                                >
                                    Chicken
                                </Typography>
                                <Typography
                                >
                                    KFC Chicken
                                </Typography>
                                <Typography
                                    sx={{
                                        mb: "1.5rem"
                                    }}
                                    color={theme.palette.secondary[700]}
                                >
                                    $30
                                </Typography>
                                <Rating value="4" readOnly />

                                <Typography variant="body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores officia ut, sint odit culpa enim.</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="primary"
                                    size="small"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    See More
                                </Button>
                            </CardActions>
                            <Collapse
                                in={isExpanded}
                                timeout="auto"
                                unmountOnExit
                                sx={{
                                    color: theme.palette.neutral[300]
                                }}
                            >
                                <CardContent>
                                    <Typography>id: 123423</Typography>
                                    <Typography>Supply Left: 12</Typography>
                                    <Typography>Yearly Sales This Year: 123423</Typography>
                                    <Typography>Yearly Units Sold This Year: 1223423</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    ))
                }
            </Box>
        </Box>
    );
};

export default ProductsPage;

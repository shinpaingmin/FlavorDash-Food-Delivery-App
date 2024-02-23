import FlexBetween from "../../components/restaurant/FlexBetween";
import Header from "../../components/restaurant/Header";
import { DownloadOutlined, Email, PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "../../components/restaurant/BreakdownChart";
import OverviewChart from "../../components/restaurant/OverviewChart";
import StatBox from "../../components/restaurant/StatBox";

const RestaurantDashboard = () => {
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");


    const data = [
        {
            id: "939fds99",
            name: "shin paing",
            email: "shinpaingmin@gmail.com",
            phoneNumber: "09349239843",
            country: "Myanmar",
            occupation: "student",
            role: "student"
        }
    ]

    const columns = [
        {
            field: "id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },

        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
            }
        },

        {
            field: "country",
            headerName: "Country",
            flex: 0.4
        },

        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1
        },

        {
            field: "role",
            headerName: "Role",
            flex: 0.5
        },
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": {gridColumn: isNonMediumScreens ? undefined : "span 12"}
                }}
            >
                <StatBox
                    title="Total Customers"
                    value="2024"
                    increase="+14%"
                    description="Since last month"
                    icon={
                        <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <StatBox
                    title="Sales Today"
                    value="111111"
                    increase="+22%"
                    description="Since last month"
                    icon={
                        <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                <StatBox
                    title="Monthly Sales"
                    value="111"
                    increase="+7%"
                    description="Since last month"
                    icon={
                        <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />
                <StatBox
                    title="Yearly Sales"
                    value="1111"
                    increase="+77%"
                    description="Since last month"
                    icon={
                        <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />

                <Box
                    gridColumn="span 8"
                    gridRow="span 3"
                    mt="40px"
                    height="75vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "5rem"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.background.alt,
                        },
                        "&. MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none"
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`
                        }
                    }}
                >
                <DataGrid
                    loading=""
                    getRowId={(row) => row.id}
                    rows={data || []}
                    columns={columns}
                />
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Sales by Category
                    </Typography>
                    <BreakdownChart isDashboard={true} />
                    <Typography p="0 0.6rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                        Breakdown of real states and infromation via category for revenue made for this year and total sales.
                    </Typography>
                </Box>
            </Box>

        </Box>
    )
}

export default RestaurantDashboard

import { useState } from "react";
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import { profile } from "../../assets/images";
import {
    AppBar,
    Box,
    IconButton,
    Button,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { useAdminLogoutMutation } from "../../services";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [adminLogout, {isSuccess, isError}] = useAdminLogoutMutation();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [image] = useState(localStorage.getItem("image"));
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    if(isSuccess || isError) {
        localStorage.clear();
        return <Navigate to="/restaurant/admin/login?status=loggedOut" />
    }

    function searchPage(e) {
        if(e.key === "Enter") {
            if("products".includes(searchValue)) {
                navigate("/products");

            } else if("orders".includes(searchValue)) {
                navigate("/orders");

            } else if("categories".includes(searchValue)) {
                navigate("/categories");

            }
            setSearchValue("");
        }
    }

    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left side  */}
                <FlexBetween>
                    <IconButton
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search for page ..." value={searchValue}
                            onKeyDown={searchPage}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                {/* Right side  */}
                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined />
                    </IconButton>

                    <FlexBetween>
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                textTransform: "none",
                                gap: "1rem",
                            }}
                        >

                            <Box
                                component="img"
                                alt="profile"
                                src={image ? `http://localhost:8000/storage/${image}` : profile}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />


                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{
                                        color: theme.palette.secondary[100],
                                    }}
                                >
                                    {localStorage.getItem("name")}
                                </Typography>

                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.75rem"
                                    sx={{
                                        color: theme.palette.secondary[200],
                                    }}
                                >
                                    Admin
                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px",
                                }}
                            />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={isOpen}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center",
                            }}
                        >
                            <MenuItem onClick={adminLogout}>Logout</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

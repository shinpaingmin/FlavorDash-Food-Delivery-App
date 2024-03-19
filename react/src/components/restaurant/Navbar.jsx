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

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const [image] = useState(localStorage.getItem("image"));

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
                        <InputBase placeholder="Search ..." />
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
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

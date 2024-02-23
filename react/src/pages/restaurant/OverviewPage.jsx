import { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "../../components/restaurant/Header";
import OverviewChart from "../../components/restaurant/OverviewChart";

const OverviewPage = () => {
    const [view, setView] = useState("units");

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Overview" subtitle="Overview of general revenue and profit" />

            <Box height="75vh">
                <FormControl sx={{ mt: "1rem" }}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="sales">Sales</MenuItem>
                        <MenuItem value="units">Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart />
            </Box>
        </Box>
    );
};

export default OverviewPage;

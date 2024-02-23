import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/restaurant/Header";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MonthlyPage = () => {
    const theme = useTheme()
    const [startDate, setStartDate] = useState(new Date("2024-02-01"));
    const [endDate, setEndDate] = useState(new Date("2024-03-01"));
    const data = [
        {
          "id": "japan",
          "color": theme.palette.secondary[600],
          "data": [
            {
              "x": "plane",
              "y": 233
            },
            {
              "x": "helicopter",
              "y": 273
            },
            {
              "x": "boat",
              "y": 91
            },
            {
              "x": "train",
              "y": 125
            },
        ]
    }
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="DAILY SALES" subtitle="Chart of daily sales" />
            <Box height="75vh">
                <Box display="flex" justifyContent="flex-end">
                    <Box>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Box>
                    <Box>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </Box>
                </Box>
                <ResponsiveLine
        data={data}
        theme={{
            axis: {
                domain: {
                    line: {
                        stroke: theme.palette.secondary[200]
                    }
                }
            },
            legend: {
                text: {
                    fill: theme.palette.secondary[200]
                }
            },
            ticks: {
                line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1
                },
                text: {
                    fill: theme.palette.secondary[200]
                }
            },
            legends: {
                text: {
                    fille: theme.palette.secondary[200]
                }
            },
            tooltip: {
                container: {
                    color: theme.palette.primary.main
                }
            }
        }}
        colors={{ datum: "color" }}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: 'transportation',
            legendOffset: 60,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -60,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
            </Box>
        </Box>
    )
}

export default MonthlyPage

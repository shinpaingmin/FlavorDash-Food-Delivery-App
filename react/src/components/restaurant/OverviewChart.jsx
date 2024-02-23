// import { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const OverviewChart = ({ isDashboard=false, view }) => {
    const theme = useTheme();
    // db query here
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
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: "left",
            tickValues: 5,
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
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 30,
                translateY: -40,
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
    )
}

export default OverviewChart

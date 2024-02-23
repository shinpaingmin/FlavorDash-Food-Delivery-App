import { Box, useTheme } from "@mui/material";
import Header from "../../components/restaurant/Header";
import { geoData } from "../../constants/geoData";
import { ResponsiveChoropleth } from "@nivo/geo"

const GeographyPage = () => {
    const theme = useTheme();
    const data = [
        {
          "id": "AFG",
          "value": 129457
        },
        {
          "id": "AGO",
          "value": 544741
        },
        {
          "id": "ALB",
          "value": 660970
        },
        {
          "id": "ARE",
          "value": 982898
        },
        {
          "id": "ARG",
          "value": 477768
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="GEOGRAPHY" subtitle="Find where your users are located."/>
            <Box
                mt="40px"
                height="75vh"
                border={`1px solid ${theme.palette.secondary[200]}`}
                borderRadius="4px"
            >
                {/* Loading here  */}
                <ResponsiveChoropleth
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
                    features={geoData.features}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    colors="nivo"
                    domain={[ 0, 60 ]}
                    unknownColor="#666666"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionScale={300}
                    projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
                    borderWidth={1.3}
                    borderColor="#fff"

                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: true,
                            translateX: 20,
                            translateY: -100,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: 'left-to-right',
                            itemTextColor: theme.palette.secondary[200],
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: theme.palette.background.alt,
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

export default GeographyPage

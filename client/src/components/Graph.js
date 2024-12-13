import React from 'react'
import { Line, Bubble, Scatter } from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import { isValid, parseISO } from "date-fns";
import autocolors from "chartjs-plugin-autocolors";
// import { useColorScheme, useMediaQuery } from '@mui/material';

import { currentColorMode } from '../Util';
import { useTheme } from '@mui/material/styles';
import { Switch, Grid2 as Grid, Box, FormGroup, FormControlLabel } from '@mui/material';

Chart.register(...registerables, autocolors);

const Graph = ({data, outputX}) => {

    const theme = useTheme();
    const [XGridChecked, setXGridChecked] = React.useState(false);
    const [YGridChecked, setYGridChecked] = React.useState(false);

    function getGridLineColor() {
        return [theme.palette.primary.main, "20"].join("");
    }

    function getBorderAndTickColor() {
        return theme.palette.primary.light;
    }

    function isTimeAxis(str) {
        return (typeof(str) === "string" && isValid(parseISO(str)));
    }

    function axisOption(isTime) {
        if (isTime) {
            return {
                    // border: {
                    //     color: "#d4d4d4",
                    // },
                    // ticks: {
                    //     color: "#d4d4d4",
                    // },
                    
                    // title: {
                    //     display: true,
                    //     text: "Date",
                    // }
                    // ticks: {
                    //     source: "data",
                    // },
                type: "time", 
                time: {
                        // parser: "yyyy-MM-dd",
                        // displayFormats: {
                        //     day: "yy-MM-dd",
                        // },
                    unit: "month",
                    tooltipFormat: "yy-MM-dd",
                }
            };
        }
        return {type: "linear"};
    }

    function graphOptions(data) {
        let xdata;
        let ydata;
        if (data.datasets.length === 0 || data.datasets[data.datasets.length - 1].data.length === 0) {
            xdata = null;
            ydata = null;
        } else {
            xdata = data.datasets[data.datasets.length - 1].data[0].xdata;
            ydata = data.datasets[data.datasets.length - 1].data[0].ydata;
        }
        return {
            parsing: {
                xAxisKey: "xdata", 
                yAxisKey: "ydata",
            },
            plugins: {
                title: {
                    display: false,
                    text: "test",
                },
            },
            scales: {
                x: {
                    ...axisOption(isTimeAxis(xdata)),
                    grid: {
                        color: getGridLineColor(),
                        display: XGridChecked,
                    },
                    border: {
                        color: getBorderAndTickColor(),
                    },
                    ticks: {
                        color: getBorderAndTickColor(),
                    },
                },
                y: {
                    // suggestedMin: 0,
                    // suggestedMax: 13,
                    border: {
                        color: getBorderAndTickColor(),
                    },
                    ticks: {
                        color: getBorderAndTickColor(),
                    },
                    grid: {
                        color: getGridLineColor(),
                        display: YGridChecked,
                    }
                },
            },
            elements: {
                point: {
                    pointStyle: !isTimeAxis(xdata),
                },
            },
            // clip: 2,
        };
    }

    function chooseGraph(data, outputX) {
        if (data === null) {
            return null;
        } else if (outputX === "date") {
            return (<Line data={data} options={graphOptions(data)}></Line>);
        } else {
            return (<Scatter data={data} options={graphOptions(data)}></Scatter>);
        }
    }

  return (
    <div>
        {chooseGraph(data, outputX)}
        <Box>
            <FormGroup row={true} sx={{justifyContent: 'center', mt: 2}}>
                <FormControlLabel control={<Switch color='secondary' checked={XGridChecked} onChange={(event, value) => setXGridChecked(value)}/>} label="X Grid"  labelPlacement='bottom'/>
                <FormControlLabel control={<Switch color='secondary' checked={YGridChecked} onChange={(event, value) => setYGridChecked(value)}/>} label="Y Grid"  labelPlacement='bottom'/>
            </FormGroup>
        </Box>
    </div>
  )
}

export default Graph

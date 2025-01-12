import React, { useEffect } from 'react'
import { Line, Bubble, Scatter } from "react-chartjs-2";
import {Chart, plugins, registerables} from "chart.js";
import { isValid, parseISO } from "date-fns";
import { useContext, useState } from 'react';
import autocolors from "chartjs-plugin-autocolors";
import zoomPlugin, { zoom } from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import {v4 as uuidv4} from 'uuid';
// import { useColorScheme, useMediaQuery } from '@mui/material';
import UpdateInfoContext from '../contexts/UpdateInfoContext';

import { useTheme } from '@mui/material/styles';
import { Switch, Grid2 as Grid, Box, FormGroup, FormControlLabel } from '@mui/material';

Chart.register(...registerables, autocolors, zoomPlugin, annotationPlugin);

const Graph = ({data, outputX}) => {

    const theme = useTheme();
    const [XGridChecked, setXGridChecked] = useState(false);
    const [YGridChecked, setYGridChecked] = useState(false);
    const [enableZoom, setEnableZoom] = useState(false);
    const [enablePan, setEnablePan]= useState(false);
    const [enableAnnotation, setEnableAnnotation] = useState(false);
    const [showAllAnnotations, setShowAllAnnotations] = useState(false);
    const [updateVisible, setUpdateVisible] = useState([]);
    const [options, setOptions] = useState(null);
    const [ChartComponent, setChartComponent] = useState(null);
    const updates = useContext(UpdateInfoContext);

    function produceLineAnnotation(updates) {
        if (updates === null || data?.datasets.length === 0) {
            return null;
        }
        let result = {};
        const keys = Object.keys(updates);
        for (let i = 0; i < keys.length; i++) {
            const labelDisplay = (updateVisible.includes(keys[i]) || showAllAnnotations) ? true : false;
            let time = keys[i];
            let id = time;
            result[id] = {
                type: 'line',
                xMin: time,
                xMax: time,
                borderColor: 'rgb(255, 99, 132, 0.4)',
                borderWidth: 2,
                adjustScaleRange: false,
                label: {
                    content: updates[time],
                    display: labelDisplay,
                    position: 'end'
                },
                interaction: {
                },
                enter: () => {toggleUpdateVisibility(id)},
                leave: () => {toggleUpdateVisibility(id)},
            };
        }
        return result;
    }

    function toggleUpdateVisibility(id) {
        if (!options) return;
        console.log("options", options);
        setUpdateVisible((prevState) => {
            if (prevState.includes(id)) {
                return prevState.filter((item) => item !== id);
            } else {
                return [...prevState, id];
            }
        });
    }

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
                zoom: {
                    pan: {
                        enabled: enablePan,
                        mode: "x",
                    }, 
                    zoom: {
                        wheel: {
                            enabled: enableZoom,
                        },
                        pinch: {
                            enabled: enableZoom,
                        },
                        mode: "x",
                    },
                    
                },
                annotation: {
                    annotations: enableAnnotation?produceLineAnnotation(updates):{},
                }
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
            animation: false,
            interaction: {
                mode: "nearest",
                intersect: false,
            }, 
            // clip: 2,
        };
    }

    function chooseGraph() {
        if (data === null) {
            return;
        } else if (outputX === "date") {
            return (<Line data={data} options={options}></Line>);
        } else {
            return (<Scatter data={data} options={options}></Scatter>);
        }
    }

    useEffect(() => {
        setOptions(graphOptions(data));
        console.log("setOptions");
    }, [data, outputX, updates, updateVisible, enablePan, enableZoom, enableAnnotation, XGridChecked, YGridChecked, enableAnnotation, showAllAnnotations])

    useEffect(() => {
        setChartComponent(chooseGraph());
    }, [data, outputX, options])

    useEffect(() => {
        console.log("options", options);
    }, [options])


    // useEffect(() => {
    //     if (!options) return;
    //     console.log("updateVisible", updateVisible);
    //     let annotations = {...options.plugins.annotation.annotations};
    //     let keys = Object.keys(annotations);
    //     for (let i = 0; i < keys.length; i++) {
    //         let key = keys[i];
    //         if (updateVisible.includes(key)) {
    //             annotations[key].label.display = false;
    //         } else {
    //             annotations[key].label.display = true;
    //         }
    //     }
    //     setOptions({...options, plugins: {...options.plugins, annotation: {annotations: annotations}}});
    // }, [updateVisible])

    // useEffect(() => {
    //     console.log("options", options);
    // }, [options])

  return (
    <div>
        {ChartComponent}
        <Box>
            <FormGroup row={true} sx={{justifyContent: 'center', mt: 2}}>
                <FormControlLabel control={<Switch id='XGridSwitch' color='secondary' checked={XGridChecked} onChange={(event, value) => setXGridChecked(value)}/>} label="X Grid"  labelPlacement='bottom'/>
                <FormControlLabel control={<Switch id='YGridSwitch' color='secondary' checked={YGridChecked} onChange={(event, value) => setYGridChecked(value)}/>} label="Y Grid"  labelPlacement='bottom'/>
                <FormControlLabel control={<Switch id='PanZoomSwitch' color='secondary' checked={enablePan} onChange={(event, value) => {setEnablePan(value); setEnableZoom(value);}}/>} label="Enable Pan/Zoom"  labelPlacement='bottom'/>
                <FormControlLabel control={<Switch id='AnnotationSwitch' color='secondary' checked={enableAnnotation} onChange={(event, value) => {setEnableAnnotation(value);}}/>} label="Enable annotation"  labelPlacement='bottom'/>
                <FormControlLabel control={<Switch id='ShowAnnotationSwitch' color='secondary' checked={showAllAnnotations} onChange={(event, value) => {setShowAllAnnotations(value);}}/>} label="Show all annotations label"  labelPlacement='bottom'/>
            </FormGroup>
        </Box>
    </div>
  )
}

export default Graph

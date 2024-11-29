import React from 'react'
import { Line, Bubble, Scatter } from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import { isValid, parseISO } from "date-fns";
import autocolors from "chartjs-plugin-autocolors";

Chart.register(...registerables, autocolors);

const Graph = ({data, outputX}) => {

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
                display: true,
                text: "test",
            },
        },
        scales: {
            x: axisOption(isTimeAxis(xdata)),
            y: {
                // suggestedMin: 0,
                // suggestedMax: 13,
                border: {
                    color: "#d4d4d4",
                },
                ticks: {
                    color: "#d4d4d4",
                },
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
        return (<Bubble data={data} options={graphOptions(data)}></Bubble>);
    }
}

  return (
    <div>
        {chooseGraph(data, outputX)}
    </div>
  )
}

export default Graph

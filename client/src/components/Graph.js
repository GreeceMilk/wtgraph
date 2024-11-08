import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';
import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import "chartjs-adapter-date-fns";
// import { parseISO } from 'date-fns';

Chart.register(...registerables);

const Graph = () => {
    const [data, setData] = useState();
    async function getData() {
        const response = await api.get("/api/nationData", 
            {params: {mode:"ab", brRange: "1", nation: "France", cls: "Aviation", output: "ab_battles_mean", lowerBr: "1"}});
        let temp = {
            datasets: [{
                label: "test",
                data: response.data,
            }]
        };
        console.log("Temp: ", temp);
        setData(temp);
        console.log("Response: ", response);
        console.log(data);
    }
    useEffect(() => {getData();},[]);

    const options = {
        parsing: {
            xAxisKey: "date", 
            yAxisKey: "ydata",
        },
        plugins: {
            title: {
                display: true,
                text: "test",
            },
        },
        scales: {
            x: {
                // border: {
                //     color: "#d4d4d4",
                // },
                // ticks: {
                //     color: "#d4d4d4",
                // },
                type: "time",
                time: {
                    // parser: "yyyy-MM-dd",
                    // displayFormats: {
                    //     day: "yy-MM-dd",
                    // },
                    unit: "month",
                    tooltipFormat: "yy-MM-dd",
                },
                // title: {
                //     display: true,
                //     text: "Date",
                // }
                // ticks: {
                //     source: "data",
                // },
            },
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
                pointStyle: false,
            },
        },
        // clip: 2,
    }
    return (
        <div width="800" height="400">
            {data?<Line data={data} options={options} />:null}
        </div>
    )
}

export default Graph

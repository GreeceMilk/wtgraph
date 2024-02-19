import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import Chart from "chart.js/auto";

const OneGraph = (props) => {
  // let price = [];
  // let ctime = [];
  // for (let i = 1; i < 30; i++) {
  //   price.push(Math.random() * 100);
  //   if (i < 10) {
  //     ctime.push("2024-01-0" + i);
  //   } else {
  //     ctime.push("2024-01-" + i);
  //   }
  // }
  // const d = props.data;
  // const ctime = d.prices.map((element) => element.time);
  // const price = d.prices.map((element) => element["new price"]);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Line Chart",
  //     },
  //   },
  // };
  const time_option = {
    plugins: {
      title: {
        display: true,
        // text: d.name + " Price History",
      },
    },
    scales: {
      x: {
        border: {
          color: "#d4d4d4",
        },
        ticks: {
          color: "#d4d4d4",
        },
        type: "time",
        time: {
          // parser: "yyyy-MM-dd",
          displayFormats: {
            day: "yy-MM-dd",
          },
          unit: "month",
          tooltipFormat: "yy-MM-dd",
        },
        ticks: {
          source: "data",
        },
      },
      y: {
        suggestedMin: 0,
        suggestedMax: 13,
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
    clip: 2,
  };
  const data = {
    labels: props.dataX,
    datasets: [
      {
        label: "Price",
        data: props.dataY,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={time_option}></Line>
      {/* {console.log(d)}
      {console.log(price)}
      {console.log(ctime)} */}
    </div>
  );
};
export default OneGraph;

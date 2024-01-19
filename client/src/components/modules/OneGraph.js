import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import Chart from "chart.js/auto";

const OneGraph = (props) => {
  let price = [];
  let ctime = [];
  for (let i = 1; i < 30; i++) {
    price.push(Math.random() * 100);
    if (i < 10) {
      ctime.push("2024-01-0" + i);
    } else {
      ctime.push("2024-01-" + i);
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const time_option = {
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM-dd",
          // displayFormats: {
          //   day: "yy-MM-dd",
          // },
        },
        ticks: {
          source: "data",
        },
      },
    },
  };
  const data = {
    labels: ctime,
    datasets: [
      {
        label: "Price",
        data: price,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} options={time_option}></Line>;
};
export default OneGraph;

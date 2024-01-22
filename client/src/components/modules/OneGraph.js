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
  const d = props.data;
  const ctime = d.prices.map((element) => element.time);
  const price = d.prices.map((element) => element["new price"]);

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
        text: d.name + " Price History",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          parser: "yyyy-MM-dd",
          displayFormats: {
            day: "yy-MM-dd",
          },
          unit: "day",
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

import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

interface coords {
  x: number;
  y: number;
}
interface report {
  maxRep: number;
  type: string;
  data: coords[];
}

export default function LineChart(props: any) {
  const [chartSetup, setChartData]: any = useState({
    datasets: [
      {
        label: "Test Chart",
        data: props.chartData.data,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf01",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [options, setOptions]: any = useState({
    plugins: {
      title: {
        display: true,
        text: "Test of Line Chart",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 1,
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  });

  useEffect(() => {
    setChartData((prevState: any) => {
      let setup = { ...prevState };
      setup.datasets[0].label = "testing";
      setup.datasets[0].data = props.chartData.data;
      return setup;
    });
  }, [props.chartData]);
  useEffect(() => {
    setOptions((prevState: any) => {
      let newChart = props.chartData;
      let options = { ...prevState };
      options.plugins.title.text = newChart.type;
      if (props.timespan === "week") {
        options.scales.x.min = props.time - 86400000 * 6;
        options.scales.x.max = props.time;
        options.scales.x.time.unit = "day";
      } else if (props.timespan === "month") {
        let date = new Date(props.time);
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toString();
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toString();
        let [ufirst, ulast] = [Date.parse(firstDay), Date.parse(lastDay)];
        options.scales.x.min = ufirst;
        options.scales.x.max = ulast;
        options.scales.x.time.unit = "day";
      } else {
        let date = new Date(props.time);
        let firstDay = new Date(date.getFullYear(), 0, 1).toString();
        let lastDay = new Date(date.getFullYear() + 1, 0, 1).toString();
        let [ufirst, ulast] = [Date.parse(firstDay), Date.parse(lastDay)];
        options.scales.x.min = ufirst;
        options.scales.x.max = ulast;
        options.scales.x.time.unit = "month";
      }
      return options;
    });
  }, [props.chartData, props.timespan, props.time]);

  return (
    <div className="chart-container w-full h-full flex justify-center lg:h-[20rem] max-h-[20rem]">
      <Line data={chartSetup} options={options} />
    </div>
  );
}

import React, { useState } from "react";
import "chart.js/auto";
import "chartjs-adapter-date-fns";
import { Scatter } from "react-chartjs-2";

interface coord {
  x: number;
  y: number;
}

interface report {
  maxRep: number;
  type: string;
  data: coord[];
}

export default function ScatterChart(props: any) {
  let chartData: coord[] = props.chartData.data;
  const [DATA, setChartData] = useState({
    datasets: [
      {
        label: "Users Gained",
        data: chartData,
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
  console.log(props.chartData);
  return (
    <div>
      <Scatter
        data={DATA}
        options={{
          scales: {
            x: {
              min: 1670922000000,
              max: 1670922000000 + 86400000 * 6,
              type: "time",
              time: {
                unit: "day",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Test of scatter chart",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

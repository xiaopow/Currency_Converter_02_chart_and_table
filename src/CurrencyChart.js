import React, { useEffect } from "react";
import Chart from "chart.js";
import './index.css'


const CurrencyChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      // responsive: true,
      data: {
        labels: props.pastDates,
        datasets: [
          {
            label: `Rates Last 30 Days: ${props.baseCurrency}/${props.compareCurrency}`,
            data: props.historicRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            lineTension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  });

  return (
    <div className="container-fluid chart-container">
     <canvas id="myChart"/>
    </div>
  );
}

export default CurrencyChart
// options = {
//   responsive: true,
//   maintainAspectRatio: false
// };

import React, { useEffect } from "react";
import Chart from "chart.js";
import './index.css'


const CurrencyChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
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
       }
    });
  });

  return (
     <div className="container-fluid mx-auto">
       <canvas id="myChart"  width="320" height="220"/>
     </div>
  );
}

export default CurrencyChart

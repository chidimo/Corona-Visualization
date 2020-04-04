const chartConfig = (labelString) => {
  return {
    cutoutPercentage: 60,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    // maintainAspectRatio: false,
    title: {
      display: true,
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            drawOnChartArea: false,
          },
          scaleLabel: {
            display: true,
            labelString,
          },
        },
      ],
    },
  };
};

export default chartConfig;

/* eslint-disable no-unused-vars */
const perfChartConfig = (
  xAxisLabel,
  yAxisLabel,
  ttLabel,
  borderColor,
  bgColor,
  titleFontColor,
  ttColor
) => {
  return {
    tooltips: {
      intersect: false,
      // yAlign: 'bottom',
      // caretPadding: 20,
      titleFontFamily: 'Gordita',
      titleFontStyle: 'bold',
      titleFontColor: titleFontColor,
      backgroundColor: bgColor,
      bodyFontFamily: 'Gordita',
      bodyFontStyle: 'bold',
      bodyFontColor: titleFontColor,
      borderColor: borderColor,
      borderWidth: 2,
      displayColors: false,
      callbacks: {
        label: (tooltipItem, data) => ttLabel,
        title: (tooltipItem, data) => tooltipItem[0]['yLabel'],
        labelColor: function () {
          return {
            borderColor: borderColor,
            backgroundColor: ttColor,
          };
        },
      },
    },
    title: {
      display: true,
    },
    legend: {
      display: false,
      // position: 'top',
      // fullWidth: true,
      // align: 'end',
      // labels: {
      //   boxWidth: 15,
      // generateLabels:  function (chart) {
      //   chart.legend.afterFit = function () {
      //     var width = this.width; // guess you can play with this value to achieve needed layout
      //     console.log(width)
      //     this.lineWidths = this.lineWidths.map(function(){return width;});
      //     return {
      //       text: 'label',
      //       fillStyle: 'red'
      //     };
      //   };
      // }
      // },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 12,
            display: true,
            maxTicksLimit: 5,
            maxRotation: 0,
            fontColor: borderColor,
            callback: (label, index, labels) => label.split('-'),
          },
          gridLines: {
            drawBorder: false,
            drawOnChartArea: false,
          },
          scaleLabel: {
            // display: true,
            labelString: xAxisLabel,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            display: true,
            maxTicksLimit: 5,
            beginAtZero: true,
            // callback: (label, index, labels) => label + '%',
          },
          gridLines: {
            drawBorder: true,
            drawOnChartArea: true,
          },
          scaleLabel: {
            // display: true,
            labelString: yAxisLabel,
          },
        },
      ],
    },
  };
};

export default perfChartConfig;

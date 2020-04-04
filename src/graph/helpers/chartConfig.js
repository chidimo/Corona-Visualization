/* eslint-disable no-unused-vars */
export const chartConfig = (
  xAxisLabel,
  yAxisLabel,
  tooltipLabel,
  borderColor,
  bgColor,
  titleFontColor,
  ttColor
) => {
  return {
    tooltips: {
      enabled: false,

      custom: function (tooltipModel) {
        const customTooltipDivId = 'custom-tooltip-div-id';
        // Tooltip Element
        let tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = `<div id="${customTooltipDivId}"></div>`;
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = '';
          bodyLines.forEach(function (body, i) {
            const num = body[i].split(':')[1];
            innerHtml += '<div id="value">' + num + '</div>';
            innerHtml += '<div>' + tooltipLabel + '</div>';
          });

          const tableRoot = tooltipEl.querySelector('#' + customTooltipDivId);
          tableRoot.innerHTML = innerHtml;
        }

        // `this` will be the overall tooltip
        const chart = this._chart;
        var position = chart.canvas.getBoundingClientRect();
        const canvas = chart.canvas;

        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top =
          position.top +
          window.pageYOffset +
          tooltipModel.caretY -
          canvas.height / 10 +
          'px';
        tooltipEl.style.padding =
          tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      },
    },
    title: {
      display: true,
    },
    legend: {
      display: false,
      // position: 'top',
      // fullWidth: true,
      // align: 'start',
      // labels: {
      //   boxWidth: 15,
      // generateLabels:  function (chart) {
      //   chart.legend.afterFit = function () {
      //     const width = this.width; // guess you can play with this value to achieve needed layout
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
            // display: true,
            maxTicksLimit: 5,
            beginAtZero: true,
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

/* eslint-disable no-unused-vars */
const plugins = {
  afterDraw: (fillColor) => {
    // draw rectangular area below the x-axis
    return function (chart, easing) {
      const yScale = chart.scales['y-axis-0'];
      const xScale = chart.scales['x-axis-0'];
      const chartArea = chart.chartArea;
      yScale.ctx.save();
      yScale.ctx.fillStyle = fillColor;
      yScale.ctx.globalCompositeOperation = 'destination-over';
      yScale.ctx.fillRect(
        xScale.left,
        yScale.bottom,
        xScale.width,
        chartArea.bottom
      );
      yScale.ctx.restore();
    };
  },

  beforeDraw: () => {
    // remove tick marks
    return function (chart) {
      const ctx = chart.ctx;
      const xScale = chart.scales['x-axis-0'];
      const yScale = chart.scales['y-axis-0'];
      if (xScale !== undefined) {
        xScale.options.gridLines.display = false;
        // yScale.options.gridLines.display = false;
        xScale.ticks.forEach(function (label, index) {
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        });
      }
    };
  },
};

export default plugins;

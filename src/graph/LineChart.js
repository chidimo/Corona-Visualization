import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chart, Line } from 'react-chartjs-2';

import { xScale } from './helpers/xScale';
import plugins from './helpers/plugins';
import chartCallbacks from './helpers/chartCallbacks';
import { chartConfig } from './helpers/chartConfig';

const LineChart = (props) => {
  let chartReference = useRef();
  let {
    dataPoints,
    yAxisLabel,
    graphLabel,
    legendLabel,
    borderColor,
    tooltipLabel,
    backgroundColor,
    legendContainerId,
  } = props;

  const yAxesData = dataPoints.map((e) => window.Number(e['qut']));

  useEffect(() => {
    const legendContainer = document.getElementById(legendContainerId);
    if (chartReference && legendContainer) {
      const leg = chartReference.current.chartInstance.generateLegend();
      legendContainer.innerHTML = leg;
    }
  }, [ chartReference, legendContainerId ]);

  Chart.plugins.register({
    beforeDraw: plugins.beforeDraw(),
  });

  return (
    <Line
      width={200}
      height={75}
      ref={(reference) => (chartReference.current = reference)}
      data={{
        labels: xScale(dataPoints),
        datasets: [
          {
            fill: true,
            lineTension: 0,
            pointRadius: 0,
            data: yAxesData,
            label: graphLabel,
            borderColor,
            backgroundColor,
          },
        ],
      }}
      options={{
        // maintainAspectRatio: false,
        ...chartConfig(
          'Number of Covid19 cases',
          yAxisLabel,
          tooltipLabel,
          borderColor,
          '#FAFCFE',
          '#111111',
          borderColor
        ),
        legendCallback: chartCallbacks.fillSquareLegend(
          [ borderColor ],
          [ legendLabel ]
        ),
      }}
    />
  );
};

LineChart.propTypes = {
  dataPoints: PropTypes.array,
  yAxisLabel: PropTypes.string,
  borderColor: PropTypes.string,
  graphLabel: PropTypes.string,
  legendLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  backgroundColor: PropTypes.string,
  legendContainerId: PropTypes.string,
};

export default React.memo(LineChart);

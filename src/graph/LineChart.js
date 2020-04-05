import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chart, Line } from 'react-chartjs-2';

import plugins from './helpers/plugins';
import chartCallbacks from './helpers/chartCallbacks';
import { chartConfig } from './helpers/chartConfig';

const LineChart = (props) => {
  let chartReference = useRef();
  let {
    dataSets,
    xAxisScale,
    yAxisLabel,
    legendLabel,
    borderColor,
    tooltipLabel,
    legendContainerId,
  } = props;

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
        labels: xAxisScale,
        datasets: dataSets,
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
  dataSets: PropTypes.array,
  xAxisScale: PropTypes.array,
  yAxisLabel: PropTypes.string,
  borderColor: PropTypes.string,
  legendLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  legendContainerId: PropTypes.string,
};

export default React.memo(LineChart);

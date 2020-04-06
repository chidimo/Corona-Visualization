import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { tooltipConfig, legendConfig } from './helpers/chartConfig';

const LineChart = (props) => {
  let chartReference = useRef();
  let { dataSets, showLegend, xAxisScale, tooltipLabel } = props;

  // useEffect(() => {
  //   const legendContainer = document.getElementById(legendContainerId);
  //   if (chartReference && legendContainer) {
  //     const leg = chartReference.current.chartInstance.generateLegend();
  //     legendContainer.innerHTML = leg;
  //   }
  // }, [ chartReference, legendContainerId ]);

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
        legend: legendConfig(showLegend),
        tooltips: tooltipConfig(tooltipLabel),
      }}
    />
  );
};

LineChart.propTypes = {
  dataSets: PropTypes.array,
  showLegend: PropTypes.bool,
  xAxisScale: PropTypes.array,
  tooltipLabel: PropTypes.string,
};

export default React.memo(LineChart);

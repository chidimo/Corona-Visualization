import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import { BorderSpinner } from '../Spinners';

import LineChart from '../../graph/LineChart';

const CovidLineChart = (props) => {
  const {
    spinner,
    graphLabel,
    dataPoints,
    yAxisLabel,
    legendLabel,
    borderColor,
    tooltipLabel,
    backgroundColor,
    legendContainerId,
  } = props;

  return (
    <Container className="graph-grid-child mt-5">
      <Container className="chart-header">
        <div className="chart-title">
          <h3>{graphLabel}</h3>
        </div>
        <div className="graph-selector-container"></div>
      </Container>

      {spinner ? (
        <BorderSpinner />
      ) : (
        <Container className="line-chart-container">
          <div className="left-aligned-legend">
            <div id={legendContainerId} className="mt-4"></div>
          </div>
          <Container>
            <LineChart
              dataPoints={dataPoints}
              yAxisLabel={yAxisLabel}
              graphLabel={graphLabel}
              borderColor={borderColor}
              legendLabel={legendLabel}
              tooltipLabel={tooltipLabel}
              backgroundColor={backgroundColor}
              legendContainerId={legendContainerId}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
};

CovidLineChart.propTypes = {
  spinner: PropTypes.bool,
  graphLabel: PropTypes.string,
  borderColor: PropTypes.string,
  dataPoints: PropTypes.array,
  yAxisLabel: PropTypes.string,
  legendLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  backgroundColor: PropTypes.string,
  legendContainerId: PropTypes.string,
};

export default CovidLineChart;

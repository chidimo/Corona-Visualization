import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import { BorderSpinner } from './Spinners';

import LineChart from '../graph/LineChart';

const LineChartWrapper = (props) => {
  const {
    xAxis,
    spinner,
    dataSets,
    graphLabel,
    showLegend,
    tooltipLabel,
    legendContainerId,
  } = props;

  return (
    <Container className="graph-grid-child mt-4">
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
              xAxisScale={xAxis}
              dataSets={dataSets}
              showLegend={showLegend}
              tooltipLabel={tooltipLabel}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
};

LineChartWrapper.propTypes = {
  xAxis: PropTypes.array,
  spinner: PropTypes.bool,
  dataSets: PropTypes.array,
  showLegend: PropTypes.bool,
  graphLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  legendContainerId: PropTypes.string,
};

export default LineChartWrapper;

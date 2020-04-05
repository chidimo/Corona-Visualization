import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import { BorderSpinner } from '../Spinners';

import LineChart from '../../graph/LineChart';
import { localeFromTSMonthShort } from '../../dateUtils';

const LineChartWrapper = (props) => {
  const {
    spinner,
    dataSets,
    graphLabel,
    dataPoints,
    yAxisLabel,
    legendLabel,
    borderColor,
    tooltipLabel,
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
              dataSets={dataSets}
              yAxisLabel={yAxisLabel}
              borderColor={borderColor}
              legendLabel={legendLabel}
              tooltipLabel={tooltipLabel}
              legendContainerId={legendContainerId}
              xAxisScale={dataPoints.map((e) =>
                localeFromTSMonthShort(e.recordDate)
              )}
            />
          </Container>
        </Container>
      )}
    </Container>
  );
};

LineChartWrapper.propTypes = {
  spinner: PropTypes.bool,
  dataSets: PropTypes.array,
  dataPoints: PropTypes.array,
  yAxisLabel: PropTypes.string,
  graphLabel: PropTypes.string,
  borderColor: PropTypes.string,
  legendLabel: PropTypes.string,
  tooltipLabel: PropTypes.string,
  legendContainerId: PropTypes.string,
};

export default LineChartWrapper;

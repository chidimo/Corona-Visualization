import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { borderColors } from '../colors';

import { DatePicker } from '../DatePicker';
import LineChartWrapper from './LineChartWrapper';
import { CountryPageTitle } from './CountryPageTitle';
import { useDatePicker, useCreateDataset } from './useCustomHooks';

const CountryCharts = () => {
  const { _id } = useParams();
  const {
    state: { name, short_name },
  } = useLocation();

  const [ data, dataDispatch ] = useDatePicker();
  const { gettingActiveCountryCases } = useSelector((state) => state.cont);

  const [
    { newCasesData, newCasesXAxis },
    { newDeathsData, newDeathsXAxis },
    { totalCasesData, totalCasesXAxis },
    { totalDeathsData, totalDeathsXAxis },
  ] = useCreateDataset(data, _id);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={name} short_name={short_name} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <LineChartWrapper
        xAxis={totalCasesXAxis}
        dataSets={[ totalCasesData ]}
        tooltipLabel={'Cases'}
        graphLabel={'Total cases'}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        spinner={gettingActiveCountryCases}
        legendLabel={'Total cases of Covid19'}
        yAxisLabel={'Total number of Covid19 cases'}
      />

      <LineChartWrapper
        xAxis={newCasesXAxis}
        dataSets={[ newCasesData ]}
        tooltipLabel={'Cases'}
        graphLabel={'New cases'}
        legendContainerId={'new-cases'}
        borderColor={borderColors.success}
        spinner={gettingActiveCountryCases}
        legendLabel={'New cases of Covid19'}
        yAxisLabel={'Number of new Covid19 cases'}
      />

      <LineChartWrapper
        xAxis={totalDeathsXAxis}
        dataSets={[ totalDeathsData ]}
        tooltipLabel={'Deaths'}
        graphLabel={'Total deaths'}
        borderColor={borderColors.danger}
        legendContainerId={'total-deaths'}
        spinner={gettingActiveCountryCases}
        legendLabel={'Total deaths from Covid19'}
        yAxisLabel={'Total number of Covid19 deaths'}
      />

      <LineChartWrapper
        xAxis={newDeathsXAxis}
        dataSets={[ newDeathsData ]}
        tooltipLabel={'Deaths'}
        graphLabel={'New deaths'}
        borderColor={borderColors.info}
        legendContainerId={'new-deaths'}
        spinner={gettingActiveCountryCases}
        legendLabel={'New deaths from Covid19'}
        yAxisLabel={'Number of new Covid19 deaths'}
      />
    </Container>
  );
};

export default CountryCharts;

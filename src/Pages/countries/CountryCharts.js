import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { DatePicker } from '../DatePicker';
import LineChartWrapper from '../LineChartWrapper';
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
    { newCasesData, newCasesXAxis, newCasesFC },
    { newDeathsData, newDeathsXAxis, newDeathsFC },
    { totalCasesData, totalCasesXAxis, totalCasesFC },
    { totalDeathsData, totalDeathsXAxis, totalDeathsFC },
  ] = useCreateDataset(data, _id);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={name} short_name={short_name} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <LineChartWrapper
        tooltipLabel={'Cases'}
        xAxis={totalCasesXAxis}
        fontColor={totalCasesFC}
        graphLabel={'Total cases'}
        dataSets={[ totalCasesData ]}
        legendContainerId={'total-cases'}
        spinner={gettingActiveCountryCases}
        legendLabel={'Total cases of Covid19'}
        yAxisLabel={'Total number of Covid19 cases'}
      />

      <LineChartWrapper
        tooltipLabel={'Cases'}
        xAxis={newCasesXAxis}
        fontColor={newCasesFC}
        graphLabel={'New cases'}
        dataSets={[ newCasesData ]}
        legendContainerId={'new-cases'}
        spinner={gettingActiveCountryCases}
        legendLabel={'New cases of Covid19'}
        yAxisLabel={'Number of new Covid19 cases'}
      />

      <LineChartWrapper
        tooltipLabel={'Deaths'}
        xAxis={totalDeathsXAxis}
        fontColor={totalDeathsFC}
        graphLabel={'Total deaths'}
        dataSets={[ totalDeathsData ]}
        legendContainerId={'total-deaths'}
        spinner={gettingActiveCountryCases}
        legendLabel={'Total deaths from Covid19'}
        yAxisLabel={'Total number of Covid19 deaths'}
      />

      <LineChartWrapper
        tooltipLabel={'Deaths'}
        xAxis={newDeathsXAxis}
        fontColor={newDeathsFC}
        graphLabel={'New deaths'}
        dataSets={[ newDeathsData ]}
        legendContainerId={'new-deaths'}
        spinner={gettingActiveCountryCases}
        legendLabel={'New deaths from Covid19'}
        yAxisLabel={'Number of new Covid19 deaths'}
      />
    </Container>
  );
};

export default CountryCharts;

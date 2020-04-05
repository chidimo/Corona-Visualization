import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { getCountryByName } from './countries/redux/countActions';

import { DatePicker } from './DatePicker';
import LineChartWrapper from './LineChartWrapper';
import { CountryPageTitle } from './countries/CountryPageTitle';
import { useDatePicker, useCreateDataset } from './countries/useCustomHooks';

const WorldCases = () => {
  const dispatch = useDispatch();

  const [ data, dataDispatch ] = useDatePicker();
  const { activeCountry, gettingActiveCountryCases } = useSelector(
    (state) => state.cont
  );

  useEffect(() => {
    getCountryByName('World')(dispatch);
  }, [ dispatch ]);

  const [
    { newCasesData, newCasesXAxis, newCasesFC },
    { newDeathsData, newDeathsXAxis, newDeathsFC },
    { totalCasesData, totalCasesXAxis, totalCasesFC },
    { totalDeathsData, totalDeathsXAxis, totalDeathsFC },
  ] = useCreateDataset(data, activeCountry._id);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={'World'} short_name={''} />
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
        xAxis={newCasesXAxis}
        fontColor={newCasesFC}
        tooltipLabel={'Cases'}
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

export default WorldCases;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { getCountryByName } from './countries/redux/countActions';

import { borderColors } from './colors';

import { DatePicker } from './DatePicker';
import LineChartWrapper from './countries/LineChartWrapper';
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
    { newCasesData, newCasesXAxis },
    { newDeathsData, newDeathsXAxis },
    { totalCasesData, totalCasesXAxis },
    { totalDeathsData, totalDeathsXAxis },
  ] = useCreateDataset(data, activeCountry._id);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={'World'} short_name={''} />
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

export default WorldCases;

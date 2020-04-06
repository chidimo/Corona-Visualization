import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { DatePicker } from '../DatePicker';
import LineChartWrapper from '../LineChartWrapper';
import { CountryPageTitle } from './CountryPageTitle';
import { useDatePicker, useCreateDataset } from './useCustomHooks';
import { getCountryById, cleanGetCountry } from './redux/countActions';

const CountryCharts = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const [ data, dataDispatch ] = useDatePicker();
  const { activeCountry, gettingActiveCountryCases } = useSelector(
    (state) => state.cont
  );
  const { name, short_name } = activeCountry;

  useEffect(() => {
    if (_id) {
      getCountryById(_id)(dispatch);
    }
    return () => {
      cleanGetCountry()(dispatch);
    };
  }, [ _id, dispatch ]);
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

      {[
        {
          tooltipLabel: 'Cases',
          xAxis: totalCasesXAxis,
          graphLabel: 'Total cases',
          dataSets: [ totalCasesData ],
          legendContainerId: 'total-cases',
          spinner: gettingActiveCountryCases,
          legendLabel: 'Total cases of Covid19',
          yAxisLabel: 'Total number of Covid19 cases',
        },
        {
          tooltipLabel: 'Cases',
          xAxis: newCasesXAxis,
          graphLabel: 'New cases',
          dataSets: [ newCasesData ],
          legendContainerId: 'new-cases',
          spinner: gettingActiveCountryCases,
          legendLabel: 'Total cases of Covid19',
        },
        {
          tooltipLabel: 'Deaths',
          xAxis: totalDeathsXAxis,
          graphLabel: 'Total deaths',
          dataSets: [ totalDeathsData ],
          legendContainerId: 'total-deaths',
          spinner: gettingActiveCountryCases,
          legendLabel: 'Total deaths from Covid19',
        },
        {
          tooltipLabel: 'Deaths',
          xAxis: newDeathsXAxis,
          graphLabel: 'New deaths',
          dataSets: [ newDeathsData ],
          legendContainerId: 'new-deaths',
          spinner: gettingActiveCountryCases,
          legendLabel: 'New deaths from Covid19',
        },
      ].map((p, i) => {
        const {
          xAxis,
          spinner,
          dataSets,
          graphLabel,
          legendLabel,
          tooltipLabel,
          legendContainerId,
        } = p;

        return (
          <LineChartWrapper
            key={i}
            xAxis={xAxis}
            spinner={spinner}
            dataSets={dataSets}
            graphLabel={graphLabel}
            legendLabel={legendLabel}
            tooltipLabel={tooltipLabel}
            legendContainerId={legendContainerId}
          />
        );
      })}
    </Container>
  );
};

export default CountryCharts;

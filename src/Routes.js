import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { Oval } from './components/Loaders';
import { Error404 } from './components/Error404';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';

import { DistRoutes } from './Pages/distributions/DistRoutes';

const WorldCases = lazy(() => import('./Pages/WorldCases'));
const SidebarLeft = lazy(() => import('./Pages/SidebarLeft'));
const SidebarRight = lazy(() => import('./Pages/SidebarRight'));
const AllCountries = lazy(() => import('./Pages/countries/AllCountries'));
const CountryCharts = lazy(() => import('./Pages/countries/CountryCharts'));

const NewCases = lazy(() => import('./Pages/distributions/NewCases'));
const TotalCases = lazy(() => import('./Pages/distributions/TotalCases'));
const TotalDeaths = lazy(() => import('./Pages/distributions/TotalDeaths'));
const NewDeaths = lazy(() => import('./Pages/distributions/NewDeaths'));

export const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Oval />}>
        <Navigation />

        <Container fluid className="top-level-container">
          <Row className="top-level-row">
            <Col xs="12" md="2" className="left-column">
              <SidebarLeft />
            </Col>

            <Col xs="12" md="8" className="middle-column">
              <Router>
                <WorldCases path="/" />
                <AllCountries path="countries" />
                <CountryCharts path="countries/:_id" />

                <DistRoutes path="dist">
                  <NewCases path="new-cases" />
                  <TotalCases path="total-cases" />
                  <TotalDeaths path="total-deaths" />
                  <NewDeaths path="new-deaths" />
                  <Error404 default />
                </DistRoutes>

                <Error404 default />
              </Router>
            </Col>

            <Col xs="12" md="2" className="right-column">
              <SidebarRight />
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
};

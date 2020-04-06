/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { Oval } from './components/Loaders';
import { Error404 } from './components/Error404';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const WorldCases = lazy(() => import('./Pages/WorldCases'));
const SidebarLeft = lazy(() => import('./Pages/SidebarLeft'));
const SidebarRight = lazy(() => import('./Pages/SidebarRight'));
const Distributions = lazy(() => import('./Pages/countries/Distributions'));
const AllCountries = lazy(() => import('./Pages/countries/AllCountries'));
const CountryCharts = lazy(() => import('./Pages/countries/CountryCharts'));

export const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Oval />}>
        <Navigation />

        <Container fluid className="top-level-container">
          <Row className="top-level-row">
            <Col sm="2" className="left-column">
              <SidebarLeft />
            </Col>

            <Col sm="8" className="middle-column">
              <Router>
                <WorldCases path="/" />
                <AllCountries path="countries" />
                <CountryCharts path="countries/:_id" />
                <Distributions path="distributions" />
                <Error404 default />
              </Router>
            </Col>

            <Col sm="2" className="right-column">
              <SidebarRight />
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
};

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

import WorldCases from './pages/WorldCases';
import SidebarLeft from './pages/SidebarLeft';
import SidebarRight from './pages/SidebarRight';
import AllCountries from './pages/countries/AllCountries';
import CountryCharts from './pages/countries/CountryCharts';

// const WorldCases = lazy(() => import('./pages/WorldCases'));
// const SidebarLeft = lazy(() => import('./pages/SidebarLeft'));
// const SidebarRight = lazy(() => import('./pages/SidebarRight'));
// const AllCountries = lazy(() => import('./pages/countries/AllCountries'));
// const CountryCharts = lazy(() => import('./pages/countries/CountryCharts'));


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
              <Router
                basepath={
                  process.env.NODE_ENV === 'production'
                    ? process.env.PUBLIC_URL
                    : '/'
                }
              >
                <WorldCases path="/" />
                <AllCountries path="countries" />
                <CountryCharts path="countries/:_id" />
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

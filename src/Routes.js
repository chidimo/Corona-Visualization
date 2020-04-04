import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { SidebarLeft } from './pages/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Oval } from './components/Loaders';
import { Error404 } from './components/Error404';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Landing = lazy(() => import('./pages/Landing'));
const Country = lazy(() => import('./pages/countries/Country'));
const Countries = lazy(() => import('./pages/countries/Countries'));

export const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Oval />}>
        <Navigation />

        <Container fluid className="top-level-container">
          <Row className="top-level-row">
            <Col sm className="left-column">
              <SidebarLeft />
            </Col>

            <Col sm="8" className="middle-column">
              <Router>
                <Landing path="/" />
                <Countries path="countries" />
                <Country path="countries/:_id" />
                <Error404 default />
              </Router>
            </Col>

            <Col sm className="right-column">
              <SidebarRight />
            </Col>
          </Row>
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
};

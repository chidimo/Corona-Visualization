import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Oval } from './components/Loaders';
import { Error404 } from './components/Error404';
import { Navigation } from './components/Navigation';
import { ErrorBoundary } from './components/ErrorBoundary';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Footer from './components/Footer';
const Landing = lazy(() => import('./pages/Landing'));
const Countries = lazy(() => import('./pages/countries/Countries'));

export const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Oval />}>
        <Navigation />

        <Container fluid className="app-body__parent">
          <Container fluid className="app-body-container">
            <Row>
              <Col>
                <SidebarLeft />
              </Col>

              <Col xs={5} className="middle-column">
                <Router>
                  <Landing path="/" />
                  <Countries path="countries" />
                  <Error404 default />
                </Router>
              </Col>

              <Col>
                <SidebarRight />
              </Col>
            </Row>
          </Container>

          <Footer />
        </Container>
      </Suspense>
    </ErrorBoundary>
  );
};

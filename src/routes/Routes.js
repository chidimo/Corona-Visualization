/* eslint-disable no-undef */
import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { Oval } from '../components/Loaders';
import { Error404 } from '../components/Error404';
import { Navigation } from '../components/Navigation';
import { ErrorBoundary } from '../components/ErrorBoundary';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { retryLazy } from './retryLazy'

const WorldCases = lazy(() => retryLazy(() => import('../pages/WorldCases')));
const SidebarLeft = lazy(() => retryLazy(() => import('../pages/SidebarLeft')));
const SidebarRight = lazy(() => retryLazy(() => import('../pages/SidebarRight')));
const Country = lazy(() => retryLazy(() => import('../pages/countries/Country')));
const Countries = lazy(() => retryLazy(() => import('../pages/countries/Countries')));


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
              <Router basename={process.env.PUBLIC_URL}>
                <WorldCases path="/" />
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

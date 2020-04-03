import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';

import { Oval } from './components/Loaders';
import { Error404 } from './components/Error404';
import { ErrorBoundary } from './components/ErrorBoundary';

const Landing = lazy(() => import('./pages/Landing'));

export const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Oval />}>
        <Router>
          <Landing path="/" />
          <Error404 default />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};
